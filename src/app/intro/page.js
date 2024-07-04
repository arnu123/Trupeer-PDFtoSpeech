import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Intro() {
  return (
    <>
      <header className="flex justify-between items-center bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="text-lg font-semibold">Trupeer.ai Book Reader</div>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <div className="flex items-center">
            <p className="text-sm text-purple-ai">Powered by AI</p>
            <Image
              src="/assets/common/ai-stars.png"
              alt="stars"
              width={22}
              height={23}
              className="ml-2"
            />
          </div>
        </div>
        
      </header>

      <section className="bg-[url('/assets/home/home-hand.png')] bg-cover bg-center mt-6 p-11">
        <div className="bg-black bg-opacity-50 p-4 rounded-md">
          <p className="font-semibold text-white">
            Trupeer.ai product converts any PDF into audio in any language.
          </p>
          <p className="text-gray-300 text-sm mt-2">
            
This proprietary platform leverages the capabilities of Generative AI to deliver dynamic, personalized audio experiences for our client partners and internal teams. Utilizing advanced Natural Language Processing and text-to-speech technology, it transforms documents into engaging, multi-lingual audio files.
          </p>
        </div>
      </section>

      <section className="mt-6">
        <div className="bg-white p-8 border border-gray-200 rounded-md">
          <p className="font-semibold">
            What possibilities does this platform unlock?
          </p>
          <p className="text-sm mt-4">
            Trainers as well as learners can benefit from Trupeer.ai in the following ways:
          </p>
          <div className="flex flex-wrap justify-between mt-10">
            <div className="flex flex-col items-center mb-8 lg:w-48">
              <p className="font-medium text-sm text-center">
              Convert any PDF into speech in any Indian language using GenAI:
              </p>
              <div className="mt-2">
                <Image
                  className="rounded-full"
                  src="/assets/home/bulb.png"
                  alt="Loading"
                  width={126}
                  height={126}
                />
              </div>
            </div>

            <div className="flex flex-col items-center mb-8 lg:w-48">
              <p className="font-medium text-sm text-center">
              Get information from your file in your most desired language.
              </p>
              <div className="mt-2">
                <Image
                  className="rounded-full"
                  src="/assets/home/laptop.png"
                  alt="Loading"
                  width={126}
                  height={126}
                />
              </div>
            </div>

            <div className="flex flex-col items-center mb-8 lg:w-48">
              <p className="font-medium text-sm text-center">
              Highlighted text synchronized with audio playback.
              </p>
              <div className="mt-2">
                <Image
                  className="rounded-full"
                  src="/assets/home/conversation.png"
                  alt="Loading"
                  width={126}
                  height={126}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="bg-white p-8 border border-gray-200 rounded-md">
          <p className="font-semibold">
            Steps to convert your PDF into multilingual speech on Trupeer.ai using Generative AI:
          </p>
          <div className="flex flex-row w-full justify-between mt-2 lg:space-x-6 ">
            <div className="flex flex-row mt-4 items-center">
              <div className="text-4xl w-6 h-100 text-center text-purple-ai mr-4 font-semibold	">
                1 
              </div>
              <div className="text-sm h-5 text-center">
                Simply upload the relevant document in pdf format (user manual,
                ppt etc.)
              </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
              <div className="text-4xl w-6 h-100 text-center text-purple-ai mr-4 font-semibold	">
                2
              </div>
              <div className="text-sm h-5 text-center">
                Text is automatically extracted and choose your desired language to get output.

                
              </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
            <div className="text-4xl w-6 h-100 text-center text-purple-ai mr-4 font-semibold	">
                3
              </div>
              <p className="text-sm">
                Click on Get Output. Wait for a few minutes and your speech is ready!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
