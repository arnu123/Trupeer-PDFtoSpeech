import {NextResponse} from "next/server";

const iso6391toActual = {
    as: "Assamese",
    av: "Avaric",
    ay: "Aymara",
    az: "Azeri",
    ba: "Bashkir",
    be: "Belarusian",
    bg: "Bulgarian",
    bh: "Bihari",
    bi: "Bislama",
    bm: "Bambara",
    bn: "Bengali",
    bo: "Tibetan",
    br: "Breton",
    bs: "Bosnian",
    ca: "Catalan",
    ce: "Chechen",
    ch: "Chamorro",
    co: "Corsican",
    cr: "Cree",
    cs: "Czech",
    cu: "Church Slavonic",
    cv: "Chuvash",
    cy: "Welsh",
    da: "Danish",
    "de-at": "German (Austria)",
    "de-ch": "German (Switzerland)",
    "de-de": "German (Germany)",
    "de-li": "German (Liechtenstein)",
    "de-lu": "German (Luxembourg)",
    de: "German",
    div: "Divehi",
    dv: "Divehi",
    dz: "Bhutani",
    ee: "Ewe",
    el: "Greek",
    "en-au": "English (Australia)",
    "en-bz": "English (Belize)",
    "en-ca": "English (Canada)",
    "en-cb": "English (Caribbean)",
    "en-gb": "English (United Kingdom)",
    "en-ie": "English (Ireland)",
    "en-jm": "English (Jamaica)",
    "en-nz": "English (New Zealand)",
    "en-ph": "English (Philippines)",
    "en-tt": "English (Trinidad and Tobago)",
    "en-us": "English (United States)",
    "en-za": "English (South Africa)",
    "en-zw": "English (Zimbabwe)",
    en: "English",
    fr: "French",
    fy: "Frisian",
    ga: "Irish",
    gd: "Gaelic",
    gl: "Galician",
    gn: "Guarani",
    gu: "Gujarati",
    gv: "Manx",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    kn: "Kannada",
    ko: "Korean",
    kok: "Konkani",
    kr: "Kanuri",
    ks: "Kashmiri",
    ml: "Malayalam",
    mn: "Mongolian",
    mo: "Moldavian",
    mr: "Marathi",
    na: "Nauru",
    nb: "Norwegian (Bokmal)",
    nd: "North Ndebele",
    ne: "Nepali (India)",
    om: "(Afan)/Oromoor/Oriya",
    or: "Oriya",
    os: "Ossetian",
    pa: "Punjabi",
    rn: "Kirundi",
    ro: "Romanian",
    ru: "Russian",
    sa: "Sanskrit",
    sd: "Sindhi",
    ta: "Tamil",
    te: "Telugu",
    ur: "Urdu",
    us: "English",
    sat: "Santali",
    mni: "Manipuri",
    mai: "Maithili",
    gom: "Konkani",
    doi: "Dogri",
    brx: "Bodo"
};


export async function POST(req, res) {
    const {initialLang} = await req.json();
    
    try {
        const res = await fetch('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline', {
            method: "POST",
            body: JSON.stringify({
            "pipelineTasks": [
                {
                    "taskType": "translation",
                    "config": {
                        "language": {
                            "sourceLanguage": initialLang,
                        }
                    }
                },
                {
                    "taskType": "tts",
                }   
            ],
            "pipelineRequestConfig": {
                "pipelineId": "64392f96daac500b55c543cd"
            }
            }),
            headers: {
            'Content-Type': 'application/json',
            'userID': process.env.NEXT_PUBLIC_userID,
            'ulcaApiKey': process.env.NEXT_PUBLIC_ulcaApiKey
            }
        });
        console.log(" Initial Config Response generated");
        if (!res.ok) {
            return NextResponse.json({ success: false, message: 'Failed translation + TTS Response' });
        }
        const result = await res.json();
        const targetLangs = result.languages[0].targetLanguageList.reduce((acc, code) => {
            acc[code] = iso6391toActual[code] || 'Unknown';
            return acc;
        }, {});

        return NextResponse.json({ success: true, targetLangs: targetLangs });
    } catch (error){
        return NextResponse.json({ success: false, message: 'Failed translation Response' });
    }
}