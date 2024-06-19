import {NextResponse} from 'next/server';

export async function POST(req, res) {

    const {bhashiniConfig, selectedLanguage, initialLang, ocrtext} = await req.json();

    if (selectedLanguage!==initialLang){
        const {translationServiceId, ttsServiceId, callbackUrl, inferenceApiKeyValue } = bhashiniConfig;
        try {
            const resp = await fetch(callbackUrl, {
            method: "POST",
            body: JSON.stringify({
                "pipelineTasks": [
                {
                    "taskType": "translation",
                    "config": {
                    "language": {
                        "sourceLanguage": initialLang,
                        "targetLanguage": selectedLanguage
                    },
                    "serviceId": translationServiceId
                    }
                },
                {
                    "taskType": "tts",
                    "config": {
                    "language": {
                        "sourceLanguage": selectedLanguage
                    },
                    "serviceId": ttsServiceId,
                    "gender": "female",
                    "samplingRate": 8000
                    }
                }
                ],
                "inputData": {
                    "input": [
                        {
                        "source": ocrtext
                        }
                    ],
                    "audio": [
                        {
                        "audioContent": null
                        }
                    ]
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': inferenceApiKeyValue
            }
            });
            let audioContent1;
            let translatedText;
            const audioResp = await resp.json();
            if (audioResp && audioResp.pipelineResponse && Array.isArray(audioResp.pipelineResponse)) {
                for (const item of audioResp.pipelineResponse) {
                    if (item.taskType === 'tts' && item.audio) {
                        for (const audio of item.audio) {
                            if (audio.audioContent) {
                                audioContent1 = audio.audioContent;
                            }
                        }
                    }else if (item.taskType === 'translation' && item.output) {
                        for (const output of item.output) {
                            if (output.target) {
                                translatedText = output.target;
                            }
                        }
                    }
                }
            }
            return NextResponse.json({ success: true, computeResult:audioContent1, translatedText:translatedText });

        } catch(e){
            return NextResponse.json({ success: false, message: 'Failed to get audio for translation+tts' });
        }
    }else{
        const { ttsServiceId, callbackUrl, inferenceApiKeyValue} = bhashiniConfig;
        try {
            const resp = await fetch(callbackUrl, {
            method: "POST",
            body: JSON.stringify({
                "pipelineTasks": [
                {
                    "taskType": "tts",
                    "config": {
                    "language": {
                        "sourceLanguage": selectedLanguage
                    },
                    "serviceId": ttsServiceId,
                    "gender": "female",
                    "samplingRate": 8000
                    }
                }
                ],
                "inputData": {
                "input": [
                    {
                    "source": ocrtext
                    }
                ]
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': inferenceApiKeyValue
            }
            });
            const audioResp = await resp.json();
            if (audioResp && audioResp.pipelineResponse && Array.isArray(audioResp.pipelineResponse)) {
                for (const item of audioResp.pipelineResponse) {
                    if (item.taskType === 'tts' && item.audio) {
                        for (const audio of item.audio) {
                            if (audio.audioContent) {
                                const audioContent = audio.audioContent;
                                return NextResponse.json({ success: true, computeResult:audioContent});
                            }
                        }
                    }
                }
            }
            
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to get audio for tts(only)' });
        }
    }
    
}
