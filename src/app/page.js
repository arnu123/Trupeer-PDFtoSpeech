"use client"
import { useState, useEffect, useCallback, useRef } from "react"

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [TtoLanguage, setLanguage] = useState('');
  const [initialLang, setInitialLanguage] = useState('');
  const [ocrtextChunks, setOcrTextChunks] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isOCRTextAvailable, setIsOCRTextAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state to track if audio is playing
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0); // New state for playback position
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // New state for playback speed
  const animationVideoRef = useRef(null); // Ref for the animation video
  
  const handleTranslationToggle = (event) => {
    setIsTranslationEnabled(event.target.checked);
  }

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setIsOCRTextAvailable(false);
    const displayFile = event.target.files ? URL.createObjectURL(event.target.files[0]) : null;
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    setPdfFile(displayFile);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/ocr', {
        method: "POST",
        body: formData
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      const result = await response.json();

      console.log(result.texts);
      setOcrTextChunks(result.texts);
      setIsOCRTextAvailable(true);
      setInitialLanguage(result.language);
      console.log(result.language);
      console.log(process.env.NEXT_PUBLIC_pipelineId);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  const fetchLanguageConfig = useCallback(async (selectedLanguage) => {
    const audioChunksTemp = [];
    
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
    console.log(bhashiniConfigResponse);
    
    for (const chunk of ocrtextChunks){
      console.log("Lets do for: ", chunk);
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
      console.log(`For ${chunk}, audio is ${bhashiniComputeResponse.computeResult}`);
    
      setAudioChunks(audioChunksTemp);
      setIsAudioAvailable(true);
      
      // console.log(bhashiniComputeResponse);
    }

  }, [initialLang, ocrtextChunks]);

  useEffect(() => {
    if (TtoLanguage) {
      if (isPlaying){
        pauseAudio();
      }
      setIsAudioAvailable(false);
      setCurrentChunkIndex(0);
      setCurrentPlaybackPosition(0);


      fetchLanguageConfig(TtoLanguage);
    }
  },[TtoLanguage, fetchLanguageConfig]);

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

  const pauseAudio = async () => {
    if (isAudioAvailable && audioChunks[currentChunkIndex]) {
      audioChunks[currentChunkIndex].pause();
      setCurrentPlaybackPosition(audioChunks[currentChunkIndex].currentTime);
      setIsPlaying(false);
      animationVideoRef.current.pause();
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 p-6">
      <div className="flex flex-col items-center justify-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
        {pdfFile && (
          <object data={pdfFile} type="application/pdf" width="100%" height="500px" className="mb-4 rounded-lg shadow-md">
            <embed src={pdfFile} type="application/pdf" />
          </object>
        )}
        <input type="file" onChange={handleFileUpload} className="mb-4 p-2 border-2 border-blue-500 rounded-md focus:ring-2 focus:ring-blue-400" />
        <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg mt-4 shadow-lg">
          <div className="relative inline-flex flex-col items-start">
            <label htmlFor="translate" className="flex items-center mb-2 text-white font-semibold">
              <input disabled={!isOCRTextAvailable} type="checkbox" id="translate" checked={isTranslationEnabled} onChange={handleTranslationToggle} className="mr-2 transform scale-125 cursor-pointer" />
              Require Translation?
            </label>
            <div className="relative inline-flex">
              <button className={`p-2 border-2 border-gray-300 rounded-md bg-white ${!isTranslationEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Language: {TtoLanguage === 'en' ? 'English' : TtoLanguage === 'or' ? 'Oriya' : TtoLanguage === 'bn' ? 'Bengali' : ''}
              </button>
              <select value={TtoLanguage} onChange={handleLanguageChange} className={`absolute top-0 left-0 w-full h-full opacity-0 ${!isTranslationEnabled ? 'pointer-events-none' : ''}`}>
                <option value="" disabled>Select language</option>
                <option value="or">Oriya</option>
                <option value="en">English</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
        <video ref={animationVideoRef} src="/1.mp4" width="300" height="300" loop className="mb-4 border-4 border-indigo-500 rounded-md shadow-md" />
        <div className="flex space-x-4">
          <button onClick={playAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Play
          </button>
          <button onClick={pauseAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Pause
          </button>
          <button onClick={speedUpAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Speed up
          </button>
          <button onClick={slowDownAudio} disabled={!isAudioAvailable} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50">
            Slow Down
          </button>
        </div>
        <div className="flex flex-col items-center m-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
        <div className="relative h-full overflow-y-auto max-h-96 w-full p-4 border-2 border-gray-300 rounded-lg bg-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <div className="whitespace-pre-wrap">
            {ocrtextChunks.map((chunk, index) => (
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
