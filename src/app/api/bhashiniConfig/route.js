import {NextResponse} from 'next/server';

export async function POST(req, res) {
    const { initialLang, selectedLanguage } = await req.json(); 
    
    if(selectedLanguage!==initialLang){
        try{
            const res = await fetch('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline', {
                method: "POST",
                body: JSON.stringify({
                "pipelineTasks": [
                    {
                    "taskType": "translation"
                    },
                    {
                    "taskType": "tts"
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
            console.log("Response generated");
            if (!res.ok) {
                return NextResponse.json({ success: false, message: 'Failed Translation + TTS Response' });
            }
            const result = await res.json();
            
            let ttsServiceId;
            let callbackUrl;
            let translationServiceId;
            
            for (const item of result.pipelineResponseConfig) {
                if (item.taskType === 'translation') {
                    for (const config of item.config) {
                        if (config.language.sourceLanguage === initialLang && config.language.targetLanguage === selectedLanguage) {
                            translationServiceId = config.serviceId;
                            break;
                        }
                    }
                }
            }

            for (const item of result.pipelineResponseConfig) {
                if (item.taskType === 'tts') {
                    for (const config of item.config) {
                        if (config.language.sourceLanguage === selectedLanguage) {
                            ttsServiceId = config.serviceId;
                            break;
                        }
                    }
                }
            }
            callbackUrl = result.pipelineInferenceAPIEndPoint.callbackUrl;
            let inferenceApiKeyValue = result.pipelineInferenceAPIEndPoint.inferenceApiKey.value;
        
            return NextResponse.json({ success: true, config: { translationServiceId, ttsServiceId, callbackUrl, inferenceApiKeyValue }});
        }catch(e){
            console.log(e)
            return NextResponse.json({ success: false, message: 'Failed to get Response' });
        }
    }else{
        try{
            const res = await fetch('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline', {
                method: "POST",
                body: JSON.stringify({
                "pipelineTasks": [
                    {
                    "taskType": "tts"
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
            console.log("Response generated");
            if (!res.ok) {
                return NextResponse.json({ success: false, message: 'Failed to get config for TTS(only)' });
            }
            const result = await res.json();
    
            let ttsServiceId;
            let callbackUrl;
    
            for (const item of result.pipelineResponseConfig) {
                if (item.taskType === 'tts') {
                    for (const config of item.config) {
                        if (config.language.sourceLanguage === selectedLanguage) {
                            ttsServiceId = config.serviceId;
                            break;
                        }
                    }
                }
            }
            callbackUrl = result.pipelineInferenceAPIEndPoint.callbackUrl;
            let inferenceApiKeyValue = result.pipelineInferenceAPIEndPoint.inferenceApiKey.value;
    
            return NextResponse.json({ success: true, config: { ttsServiceId, callbackUrl, inferenceApiKeyValue }});
        }catch (e){
            console.log(e)
            return NextResponse.json({ success: false, message: 'Failed to get config for TTS(only)' });
        }
    }
}