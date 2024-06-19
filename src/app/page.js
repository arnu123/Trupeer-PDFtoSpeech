"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from 'next/image';

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [TtoLanguage, setLanguage] = useState('');
  const [initialLang, setInitialLanguage] = useState('');
  const [targetLangs, setTargetLangs] = useState([]);
  const [ocrtextChunks, setOcrTextChunks] = useState([]);
  const [translatedTextChunks, setTranslatedTextChunks] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
  const [AllAudioChunksGenerated, setAllAudioChunksGenerated] = useState(false);
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(false);
  const [isShowOCRText, setShowOCRText] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isOCRTextAvailable, setIsOCRTextAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state to track if audio is playing
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0); // New state for playback position
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // New state for playback speed
  const [isLoading1, setIsLoading1] = useState(false); // New state for loading ocr text
  const animationVideoRef = useRef(null); // Ref for the animation video

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setIsOCRTextAvailable(false);
    
    const displayFile = event.target.files ? URL.createObjectURL(event.target.files[0]) : null;
    setPdfFile(displayFile);
    
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;    

    const formData = new FormData();
    formData.append('file', file);

    try {
      setTargetLangs([]);
      setIsLoading1(true);
      const response = await fetch('/api/ocr', {
        method: "POST",
        body: formData
      });
      console.log("OCR response generated");
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      const result = await response.json();
      setOcrTextChunks(result.texts);
      
      setInitialLanguage(result.language);
      console.log("Language of PDF: " ,result.language);
      
      try{
        const res = await fetch('api/initialBhashiniConfig',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            initialLang: result.language
          })
        });
        const response = await res.json();
        setIsLoading1(false); 
        const targetLanguages = response.targetLangs;
        setTargetLangs(targetLanguages);
        setIsOCRTextAvailable(true);
        
      } catch(error){
        console.error('There was a problem with fetching target languages:', error);
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleTranslationToggle = (event) => {
    setIsTranslationEnabled(event.target.checked);
  }

  const handleGetOutput=()=>{
    if (!isTranslationEnabled) {
      // If translation is not required, use the language of the PDF
      setIsAudioAvailable(false);
      setAudioChunks([]);
      setCurrentChunkIndex(0);
      setPlaybackSpeed(1);
      fetchLanguageConfig(initialLang);
    } else {
      // If translation is required, use the selected language
      if(!TtoLanguage){
        alert('Please select a language. If you do not want translation, uncheck the "Require Translation" box.');
        return;
      }
      setIsAudioAvailable(false);
      setAudioChunks([]);
      setCurrentChunkIndex(0);
      setPlaybackSpeed(1);
      fetchLanguageConfig(TtoLanguage);
    }
     
  }

  const fetchLanguageConfig = useCallback(async (selectedLanguage) => {
    const audioChunksTemp = [];
    const translatedChunksTemp = [];
    const res = await fetch('/api/bhashiniConfig', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          initialLang,
          selectedLanguage
        })
        }
    );

    const bhashiniConfigResponse = await res.json();

    for (const chunk of ocrtextChunks){
      console.log("Chunk ", chunk);
      const res1 = await fetch('/api/bhashiniCompute',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bhashiniConfig: bhashiniConfigResponse.config,
            selectedLanguage,
            initialLang,
            ocrtext: chunk
          })
      });
      const bhashiniComputeResponse = await res1.json();
      audioChunksTemp.push(new Audio(`data:audio/wav;base64,${bhashiniComputeResponse.computeResult}`));
      
      if(bhashiniComputeResponse.translatedText){
        translatedChunksTemp.push(bhashiniComputeResponse.translatedText);
      }
      
      if(translatedChunksTemp.length > 0){
        setTranslatedTextChunks(translatedChunksTemp);
      }
      setAudioChunks(audioChunksTemp);
      setShowOCRText(true);
      setIsAudioAvailable(true);
    }
    setAllAudioChunksGenerated(true);
  }, [initialLang, ocrtextChunks]);

  useEffect(() => {
    if (TtoLanguage) {
      if (isPlaying){
        pauseAudio();
      }
      setIsAudioAvailable(false);
      setCurrentChunkIndex(0);
      setCurrentPlaybackPosition(0);
      setPlaybackSpeed(1);
    }
  },[TtoLanguage, isPlaying, pauseAudio]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log(selectedLanguage);
  };

  const playAudio = async () => {
    if(isAudioAvailable && audioChunks.length > 0){
      const playNextChunk = (index, startTime=0) =>{
        if (index< audioChunks.length){
          setCurrentChunkIndex(index);
          audioChunks[index].currentTime = startTime;
          audioChunks[index].playbackRate = playbackSpeed; 
          audioChunks[index].play();
          animationVideoRef.current.play();
          audioChunks[index].onended = () => {
            playNextChunk(index + 1);
          };
          setCurrentPlaybackPosition(startTime); // Reset the playback position
        }else{
          setIsPlaying(false);
          animationVideoRef.current.pause();
          // Reset to start when audio finishes
          setCurrentChunkIndex(0);
          setCurrentPlaybackPosition(0);
        }
      }

      setIsPlaying(true);
      playNextChunk(currentChunkIndex, currentPlaybackPosition);
    }
  }

  const pauseAudio = useCallback(async () => {
    if (isAudioAvailable && audioChunks[currentChunkIndex]) {
      audioChunks[currentChunkIndex].pause();
      setCurrentPlaybackPosition(audioChunks[currentChunkIndex].currentTime);
      setIsPlaying(false);
      animationVideoRef.current.pause();
    }
  }, [audioChunks, currentChunkIndex, isAudioAvailable]);

  const toggleAudioPlayback=()=>{
    if(isPlaying){
      pauseAudio();
    }else{
      playAudio();
    }
  }
  
  const speedUpAudio = async () => {
    if (playbackSpeed < 16) {
      const newSpeed = playbackSpeed + 0.5;
      setPlaybackSpeed(newSpeed);
      if (isAudioAvailable && audioChunks[currentChunkIndex]) {
        audioChunks[currentChunkIndex].playbackRate = newSpeed;
      }
    }
  }

  const slowDownAudio = async () => {
    if (playbackSpeed > 0.5) {
      const newSpeed = playbackSpeed - 0.5;
      setPlaybackSpeed(newSpeed);
      if (isAudioAvailable && audioChunks[currentChunkIndex]) {
        audioChunks[currentChunkIndex].playbackRate = newSpeed;
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      <Image src="/logo.png"  alt="Logo" className="absolute top-0 left-0 m-4 " width = "230" height = "14" />
      <div className="flex flex-col items-center justify-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-[#BEBBBB] shadow-xl">
        {pdfFile && (
          <div className="w-full h-full">
            <object data={pdfFile} type="application/pdf" width="800px" height="634px" className="rounded-lg shadow-md" />
          </div>
        )}
        <input type="file" onChange={handleFileUpload} className="mb-4 p-2 border-2 border-blue-500 rounded-md focus:ring-2 focus:ring-blue-400" />
        <div className="bg-gradient-to-r from-[#430F39] via-[#E68CDC] to-[#F0B7EA] p-4 rounded-lg mt-4 shadow-lg">
        {isLoading1 ? (
          <div className="text-white font-semibold">LOADING... please wait</div>
         ) : (
          <div className="relative inline-flex flex-col items-start">
            <label htmlFor="translate" className="flex items-center mb-2 text-white font-semibold">
              <input disabled={!isOCRTextAvailable} type="checkbox" id="translate" checked={isTranslationEnabled} onChange={handleTranslationToggle} className={`mr-2 transform scale-125 cursor-pointer ${   !isOCRTextAvailable ? 'cursor-not-allowed opacity-50' : '' }` }/>
              Require Translation?
            </label>
            <div className="relative inline-flex">
              <button className={`p-2 border-2 border-gray-300 rounded-md bg-white ${!isTranslationEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Language: {targetLangs[TtoLanguage] || ''}
              </button>
              <select value={TtoLanguage} onChange={handleLanguageChange} className={`absolute top-0 left-0 w-full h-full opacity-0 ${!isTranslationEnabled ? 'pointer-events-none' : ''}`}>
                <option value="" disabled>Select language</option>
                {Object.entries(targetLangs).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
          </div>
         )}</div>
        <button disabled={!isOCRTextAvailable} onClick={handleGetOutput} className="mt-4 px-4 py-2 border-2 border-gray-300 rounded-md bg-gradient-to-r from-[#430F39] via-[#E68CDC] to-[#F0B7EA] text-white hover:bg-gray-200">
         {isLoading1 ? "LOADING... please wait" : "Get Output"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-[#BEBBBB] shadow-xl">
        <video ref={animationVideoRef} src="/2.mp4" width="300" height="300" loop className="mb-4 border-4 border-indigo-500 rounded-md shadow-md" />
        <div className="flex space-x-4">
          <button onClick={toggleAudioPlayback} disabled={!isAudioAvailable} className={`px-4 py-2 ${isPlaying ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded-full shadow-md hover:${isPlaying ? 'bg-yellow-600' : 'bg-green-600'} transition-transform transform hover:scale-105 disabled:opacity-50`}>
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                Pause
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Play
              </>
            )}
          </button>
          <button onClick={speedUpAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Speed up
          </button>
          <button onClick={slowDownAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Slow Down
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-lg font-semibold">Current Speed: </span>
          <span className="text-xl font-bold ml-2">{playbackSpeed.toFixed(1)}x</span>
        </div>
        <div className="flex flex-col items-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
          <div className="relative h-full overflow-y-auto max-h-96 w-full p-4 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4"></h2>
            <div className="whitespace-pre-wrap">
            {isShowOCRText && (isTranslationEnabled ? translatedTextChunks : ocrtextChunks).map((chunk, index) => (
              <p key={index} className={index === currentChunkIndex ? 'highlighted' : ''}>
                {chunk}
              </p>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
