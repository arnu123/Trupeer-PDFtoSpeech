import {
  CreateVideoNavIcon,
  HomeNavIcon,
  VideoLibraryNavIcon,
} from "./icons/main";
import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    paths: ["/"],
    lightIcon: <HomeNavIcon color="white" />,
    darkIcon: <HomeNavIcon color="black" />,
  },
  {
    title: "Create new",
    paths: ["/new"],
    darkIcon: <CreateVideoNavIcon color="black" />,
    lightIcon: <CreateVideoNavIcon color="white" />,
  },
  // {
  //   title: 'Chatbot',
  //   paths: ['/chatbot/modify','/chatbot/configure', '/chatbot/verify'],
  //   icon: <Icon icon="lucide:message-circle" width="24" height="24" />,
  // },
];

const THEME_DEFINITIONS: { [key: string]: { [key: string]: any } } = {
  default: {
    APP_TITLE: "Accenture Knowledge Accelerator",
    APP_DESC_TITLE: "What is Accenture Knowledge Accelerator?",
    APP_TITLE_ALTERNATE: "Accenture Knowledge Hub",
    LOGO: {
      src: "/assets/common/Acc_Logo_Black_Purple_RGB.png",
      className: "w-3/5",
    },
    CHATBOT_INTRO: "Welcome to Accenture’s official AI chatbot!",
  },
  trupeer_demo: {
    APP_TITLE: "Trupeer Text Explainer",
    APP_DESC_TITLE: "What does Trupeer AI do?",
    APP_TITLE_ALTERNATE: "Trupeer.ai",
    LOGO: {
      src: "/assets/common/Acc_Logo_Black_Purple_RGB.png",
      className: "w-3/5",
    },
    CHATBOT_INTRO: "Welcome to the Trupeer AI chatbot!",
  },
};

const VOICE_MAPPING_DEFINITIONS: { [key: string]: VoiceMapping[] } = {
  default: [
    {
      voiceAPI: "eleven_labs",
      language: "english",
      gender: "male",
      voiceID: "1qZOLVpd1TVic43MSkFY",
    },
    {
      voiceAPI: "eleven_labs",
      language: "english",
      gender: "female",
      voiceID: "nGq1wtttoxLd3CU95B51",
    },
    {
      voiceAPI: "eleven_labs",
      language: "hindi",
      gender: "male",
      voiceID: "1qZOLVpd1TVic43MSkFY",
    },
    {
      voiceAPI: "eleven_labs",
      language: "hindi",
      gender: "female",
      voiceID: "nGq1wtttoxLd3CU95B51",
    },
    {
      voiceAPI: "eleven_labs",
      language: "spanish",
      gender: "male",
      voiceID: "T5cu6IU92Krx4mh43osx",
    },
    {
      voiceAPI: "eleven_labs",
      language: "spanish",
      gender: "female",
      voiceID: "2Dmn7JhwZi0MklfT1N0v",
    },
    {
      voiceAPI: "eleven_labs",
      language: "arabic",
      gender: "male",
      voiceID: "T5cu6IU92Krx4mh43osx",
    },
    {
      voiceAPI: "eleven_labs",
      language: "arabic",
      gender: "female",
      voiceID: "2Dmn7JhwZi0MklfT1N0v",
    },
    {
      voiceAPI: "eleven_labs",
      language: "portuguese",
      gender: "male",
      voiceID: "T5cu6IU92Krx4mh43osx",
    },
    {
      voiceAPI: "eleven_labs",
      language: "portuguese",
      gender: "female",
      voiceID: "2Dmn7JhwZi0MklfT1N0v",
    },
  ],
  trupeer_demo: [
    {
      voiceAPI: "bhashini",
      language: "english",
      gender: "male",
      voiceID: "en_male",
    },
    {
      voiceAPI: "bhashini",
      language: "english",
      gender: "female",
      voiceID: "en_female",
    },
    {
      voiceAPI: "bhashini",
      language: "hindi",
      gender: "male",
      voiceID: "hi_male",
    },
    {
      voiceAPI: "bhashini",
      language: "hindi",
      gender: "female",
      voiceID: "hi_female",
    },
    {
      voiceAPI: "bhashini",
      language: "assamese",
      gender: "male",
      voiceID: "as_male",
    },
    {
      voiceAPI: "bhashini",
      language: "assamese",
      gender: "female",
      voiceID: "as_female",
    },
    {
      voiceAPI: "bhashini",
      language: "kannada",
      gender: "male",
      voiceID: "kn_male",
    },
    {
      voiceAPI: "bhashini",
      language: "kannada",
      gender: "female",
      voiceID: "kn_female",
    },
    {
      voiceAPI: "bhashini",
      language: "punjabi",
      gender: "male",
      voiceID: "pa_male",
    },
    {
      voiceAPI: "bhashini",
      language: "punjabi",
      gender: "female",
      voiceID: "pa_female",
    },
    {
      voiceAPI: "bhashini",
      language: "malayalam",
      gender: "male",
      voiceID: "ml_male",
    },
    {
      voiceAPI: "bhashini",
      language: "malayalam",
      gender: "female",
      voiceID: "ml_female",
    },
    {
      voiceAPI: "bhashini",
      language: "gujarati",
      gender: "male",
      voiceID: "gu_male",
    },
    {
      voiceAPI: "bhashini",
      language: "gujarati",
      gender: "female",
      voiceID: "gu_female",
    },
    {
      voiceAPI: "bhashini",
      language: "telugu",
      gender: "male",
      voiceID: "te_male",
    },
    {
      voiceAPI: "bhashini",
      language: "telugu",
      gender: "female",
      voiceID: "te_female",
    },
    {
      voiceAPI: "bhashini",
      language: "marathi",
      gender: "male",
      voiceID: "mr_male",
    },
    {
      voiceAPI: "bhashini",
      language: "marathi",
      gender: "female",
      voiceID: "mr_female",
    },
    {
      voiceAPI: "bhashini",
      language: "tamil",
      gender: "male",
      voiceID: "ta_male",
    },
    {
      voiceAPI: "bhashini",
      language: "tamil",
      gender: "female",
      voiceID: "ta_female",
    },
    {
      voiceAPI: "bhashini",
      language: "bengali",
      gender: "male",
      voiceID: "bn_male",
    },
    {
      voiceAPI: "bhashini",
      language: "bengali",
      gender: "female",
      voiceID: "bn_female",
    },
    {
      voiceAPI: "bhashini",
      language: "oriya",
      gender: "male",
      voiceID: "or_male",
    },
    {
      voiceAPI: "bhashini",
      language: "oriya",
      gender: "female",
      voiceID: "or_female",
    },
    {
      voiceAPI: "eleven_labs",
      language: "english",
      gender: "male",
      voiceID: "T5cu6IU92Krx4mh43osx",
    },
    {
      voiceAPI: "eleven_labs",
      language: "english",
      gender: "female",
      voiceID: "2Dmn7JhwZi0MklfT1N0v",
    },
    {
      voiceAPI: "eleven_labs",
      language: "hindi",
      gender: "male",
      voiceID: "1qZOLVpd1TVic43MSkFY",
    },
    {
      voiceAPI: "eleven_labs",
      language: "hindi",
      gender: "female",
      voiceID: "tKZQTIqwDrPzLv6MrPxF",
    },
    {
      voiceAPI: "eleven_labs",
      language: "spanish",
      gender: "male",
      voiceID: "T5cu6IU92Krx4mh43osx",
    },
    {
      voiceAPI: "eleven_labs",
      language: "spanish",
      gender: "female",
      voiceID: "2Dmn7JhwZi0MklfT1N0v",
    },
    {
      voiceAPI: "eleven_labs",
      language: "arabic",
      gender: "male",
      voiceID: "1qZOLVpd1TVic43MSkFY",
    },
    {
      voiceAPI: "eleven_labs",
      language: "arabic",
      gender: "female",
      voiceID: "tKZQTIqwDrPzLv6MrPxF",
    },
    {
      voiceAPI: "openai",
      language: "english",
      gender: "female",
      voiceID: "alloy",
    },
    {
      voiceAPI: "openai",
      language: "english",
      gender: "male",
      voiceID: "onyx",
    },
    {
      voiceAPI: "openai",
      language: "hindi",
      gender: "female",
      voiceID: "alloy",
    },
    {
      voiceAPI: "openai",
      language: "hindi",
      gender: "male",
      voiceID: "onyx",
    },
    // Add more mappings as needed
  ],
};

const USER_ID_DEFINITION: { [key: string]: string } = {
  default: "6606bbf7b284bf0220207380",
  trupeer_demo: "6606d37db284bf0220207381",
};

const CHATBOT_ID_DEFINITION: { [key: string]: string } = {
  default: "65db2d2307960589cc218f52",
  trupeer_demo: "6615246ed264f505ec8cf977",
};

const CHATBOT_OPTION_DEFINITIONS: { [key: string]: ChatbotOption[] } = {
  default: [
    {
      dataId: "q1",
      value: "How can I create a financial statement?",
    },
    {
      dataId: "q2",
      value:
        "What is the difference between asset scrapping and inventory scrapping?",
    },
    {
      dataId: "q3",
      value: "What is the transaction code for business partner creation?",
    },
  ],
  trupeer_demo: [
    {
      dataId: "q1",
      value: "What can you do for me?",
    },
  ],
};

interface ChatbotOption {
  dataId: string;
  value: string;
}

interface VoiceMapping {
  voiceAPI: string;
  language: string;
  gender: string;
  voiceID: string;
}

export const THEME_CONSTANTS =
  THEME_DEFINITIONS[
    (process.env.NEXT_PUBLIC_THEME as keyof typeof THEME_DEFINITIONS) ||
      "default"
  ];

export const IS_DEMO_THEME = process.env.NEXT_PUBLIC_THEME === "trupeer_demo";

export const VOICE_MAPPING =
  VOICE_MAPPING_DEFINITIONS[
    (process.env.NEXT_PUBLIC_THEME as keyof typeof VOICE_MAPPING_DEFINITIONS) ||
      "default"
  ];

export const USER_ID =
  USER_ID_DEFINITION[
    (process.env.NEXT_PUBLIC_THEME as keyof typeof USER_ID_DEFINITION) ||
      "default"
  ];

export const CHATBOT_ID =
  CHATBOT_ID_DEFINITION[
    (process.env.NEXT_PUBLIC_THEME as keyof typeof CHATBOT_ID_DEFINITION) ||
      "default"
  ];
export const CHATBOT_OPTIONS =
  CHATBOT_OPTION_DEFINITIONS[
    (process.env
      .NEXT_PUBLIC_THEME as keyof typeof CHATBOT_OPTION_DEFINITIONS) ||
      "default"
  ];
