import {NextResponse} from 'next/server';
// const pdf = require('pdf-poppler');
import fs from 'fs';
const path = require('path');
import Tesseract from 'tesseract.js';
import {franc} from 'franc'
import pdftocairoWrapper from './pdftocairo-wrapper';
const {spawn} = require('child_process');

const os = require("os");
const iso6393To1 = {
  aar: 'aa',
  abk: 'ab',
  afr: 'af',
  aka: 'ak',
  amh: 'am',
  ara: 'ar',
  arg: 'an',
  asm: 'as',
  ava: 'av',
  ave: 'ae',
  aym: 'ay',
  aze: 'az',
  bak: 'ba',
  bam: 'bm',
  bel: 'be',
  ben: 'bn',
  bis: 'bi',
  bod: 'bo',
  bos: 'bs',
  bre: 'br',
  bul: 'bg',
  cat: 'ca',
  ces: 'cs',
  cha: 'ch',
  che: 'ce',
  chu: 'cu',
  chv: 'cv',
  cor: 'kw',
  cos: 'co',
  cre: 'cr',
  cym: 'cy',
  dan: 'da',
  deu: 'de',
  div: 'dv',
  dzo: 'dz',
  ell: 'el',
  eng: 'en',
  epo: 'eo',
  est: 'et',
  eus: 'eu',
  ewe: 'ee',
  fao: 'fo',
  fas: 'fa',
  fij: 'fj',
  fin: 'fi',
  fra: 'fr',
  fry: 'fy',
  ful: 'ff',
  gla: 'gd',
  gle: 'ga',
  glg: 'gl',
  glv: 'gv',
  grn: 'gn',
  guj: 'gu',
  hat: 'ht',
  hau: 'ha',
  hbs: 'sh',
  heb: 'he',
  her: 'hz',
  hin: 'hi',
  hmo: 'ho',
  hrv: 'hr',
  hun: 'hu',
  hye: 'hy',
  ibo: 'ig',
  ido: 'io',
  iii: 'ii',
  iku: 'iu',
  ile: 'ie',
  ina: 'ia',
  ind: 'id',
  ipk: 'ik',
  isl: 'is',
  ita: 'it',
  jav: 'jv',
  jpn: 'ja',
  kal: 'kl',
  kan: 'kn',
  kas: 'ks',
  kat: 'ka',
  kau: 'kr',
  kaz: 'kk',
  khm: 'km',
  kik: 'ki',
  kin: 'rw',
  kir: 'ky',
  kom: 'kv',
  kon: 'kg',
  kor: 'ko',
  kua: 'kj',
  kur: 'ku',
  lao: 'lo',
  lat: 'la',
  lav: 'lv',
  lim: 'li',
  lin: 'ln',
  lit: 'lt',
  ltz: 'lb',
  lub: 'lu',
  lug: 'lg',
  mah: 'mh',
  mal: 'ml',
  mar: 'mr',
  mkd: 'mk',
  mlg: 'mg',
  mlt: 'mt',
  mon: 'mn',
  mri: 'mi',
  msa: 'ms',
  mya: 'my',
  nau: 'na',
  nav: 'nv',
  nbl: 'nr',
  nde: 'nd',
  ndo: 'ng',
  nep: 'ne',
  nld: 'nl',
  nno: 'nn',
  nob: 'nb',
  nor: 'no',
  nya: 'ny',
  oci: 'oc',
  oji: 'oj',
  ori: 'or',
  orm: 'om',
  oss: 'os',
  pan: 'pa',
  pli: 'pi',
  pol: 'pl',
  por: 'pt',
  pus: 'ps',
  que: 'qu',
  roh: 'rm',
  ron: 'ro',
  run: 'rn',
  rus: 'ru',
  sag: 'sg',
  san: 'sa',
  sin: 'si',
  slk: 'sk',
  slv: 'sl',
  sme: 'se',
  smo: 'sm',
  sna: 'sn',
  snd: 'sd',
  som: 'so',
  sot: 'st',
  spa: 'es',
  sqi: 'sq',
  srd: 'sc',
  srp: 'sr',
  ssw: 'ss',
  sun: 'su',
  swa: 'sw',
  swe: 'sv',
  tah: 'ty',
  tam: 'ta',
  tat: 'tt',
  tel: 'te',
  tgk: 'tg',
  tgl: 'tl',
  tha: 'th',
  tir: 'ti',
  ton: 'to',
  tsn: 'tn',
  tso: 'ts',
  tuk: 'tk',
  tur: 'tr',
  twi: 'tw',
  uig: 'ug',
  ukr: 'uk',
  urd: 'ur',
  uzb: 'uz',
  ven: 've',
  vie: 'vi',
  vol: 'vo',
  wln: 'wa',
  wol: 'wo',
  xho: 'xh',
  yid: 'yi',
  yor: 'yo',
  zha: 'za',
  zho: 'zh',
  zul: 'zu'
}
export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    const tempDir = path.join(os.tmpdir(), 'tmp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const tempFilePath = path.join(tempDir, file.name);
    
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer));
    
    const outputDir = path.join(tempDir, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    let opts = {
      density:300,
      depth:8,
      format: 'jpeg',
      out_dir: outputDir,
      out_prefix: path.basename(tempFilePath, path.extname(tempFilePath)),
      page: null,
    }
    
    const convertPDF = async (inputPath, options) => {
      let stdout;
      try {
        if (os.platform()=== 'win32' || process.platform === 'darwin') {
          // Use pdf-poppler for Windows and macOS
          stdout = await convertPDFWithPoppler(inputPath, options);
        } else if (os.platform()=== 'linux') {
          // Use poppler-utils for Linux
          
          stdout = await convertPDFWithPopplerUtils(inputPath, options);
        } else {
          throw new Error('Unsupported platform');
        }
        console.log("PDF converted to images");
        return stdout;
      } catch (conversionError) {
        console.error("Error during PDF conversion:", conversionError);
        throw conversionError;
      }
    };

    // Function to convert PDF using pdf-poppler (Windows/macOS)
  const convertPDFWithPoppler = (inputPath, options) => {
      return new Promise((resolve, reject) => {
        const args = [
          "-jpeg",
          "-scale-to",
          "1024",
          inputPath,
          path.join(options.out_dir, options.out_prefix),
        ];
        pdftocairoWrapper(args, (error, stdout) => {
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
        });
      });
    };
  const convertPDFWithPopplerUtils = (inputPath, options) => {
    console.log(inputPath)
      return new Promise((resolve, reject) => {
        const args = [
          "-jpeg",
          "-r",
          "300", // Adjust as needed for resolution
          inputPath,
          path.join(options.out_dir, options.out_prefix),
        ];
        const pdftocairoProcess = spawn('pdftocairo', args);
        let stdout = '';
        let stderr = '';
         pdftocairoProcess.stdout.on('data', (data) => {
          stdout += data.toString();
      });

    // Capture the standard error
    pdftocairoProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Handle process completion
    pdftocairoProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`pdftocairo process exited with code ${code}: ${stderr}`));
      }
    });

    // Handle process errors
    pdftocairoProcess.on('error', (err) => {
      reject(err);
    });
      });
    };
    
    try {
      await convertPDF(tempFilePath, opts);
      console.log("PDF converted to images");
    } catch (conversionError) {
      console.error("Error during PDF conversion:", conversionError);
      return NextResponse.json(
        { error: "PDF conversion error" },
        { status: 500 }
      );

    }

    let fullText = '';
    const imageFiles = fs.readdirSync(outputDir).filter((file) => file.endsWith('.jpg'));

    for (const imageFile of imageFiles) {

      const imagePath = path.join(outputDir, imageFile);
      console.log('Processing image:', imagePath);
      console.time('Text generation'); // Start timer 

      const { data : {text}} = await Tesseract.recognize(imagePath, 'eng+hin+pan' );
      console.timeEnd('Text generation'); // End timer and print elapsed time
      fullText += text;
      fs.unlinkSync(imagePath);
      
    }
    
    fs.rmdirSync(outputDir, { recursive: true });
    fs.unlinkSync(tempFilePath); // Remove the temp file after processing
    fs.rmdirSync(tempDir, { recursive: true }); // Remove the temp directory after processing
    
    const textChunks = splitTextIntoChunks(fullText);

    const PDFlanguage = franc(fullText);
    const iso6391Language = iso6393To1[PDFlanguage];

    return NextResponse.json({ texts: textChunks , language:iso6391Language});

  } catch (error) {
    
    console.error('Error processing the PDF:', error);
    return NextResponse.json({ error: 'Processing error' }, { status: 500 });
  
  }
}

function splitTextIntoChunks(text, chunkSize = 300){
  const chunks = [];
  let startIndex= 0;

  while(startIndex < text.length){
    let endIndex = Math.min(startIndex + chunkSize, text.length);

    if(endIndex<text.length){
      endIndex = text.lastIndexOf(' ', endIndex);
    }

    chunks.push(text.substring(startIndex, endIndex));
    startIndex = endIndex+1;

  }
  return chunks;
}
