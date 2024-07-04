import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageIcon } from "../icons/main";
import { VOICE_MAPPING } from "../constants";

const SUPPORTED_FLYING_FORMATION = [
  "Energy",
  "Chemical and Natural Resources",
  "Utilities",
  "Consumer Goods and Services",
  "IMT",
  "FS",
  "CMT",
];

const SUPPORTED_PROCESS = [
  "Finance and Accounts",
  "Procurement and Inventory Management",
  "Human Resource Management",
  "Plant Maintenance",
  "Project System",
];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formDataToJson = (formData: FormData) => {
  const o: any = {};
  formData.forEach((value, key) => (o[key] = value));
  return JSON.stringify(o);
};

export const Chip = ({
  text,
  textSize = "text-[0.65rem]",
  bgColor = "bg-gray-200",
  textColor = "text-black",
  smartTag = false,
  key = "",
}: any) => {
  if (!text) {
    return <div></div>;
  }

  var extraClasses = "";
  if (smartTag) {
    extraClasses =
      "inline text-ellipsis max-w-40 truncate hover:whitespace-normal hover:max-w-60";
  } else {
    extraClasses = "flex";
  }

  return (
    <div className="flex pr-1" key={key}>
      <div
        className={`flex px-2 pt-0.5 pb-1 ${bgColor} rounded-full border border-gray-100`}
      >
        <div
          className={`${textSize} ${textColor} whitespace-nowrap capitalize ${extraClasses}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export const LanguageChip = ({
  language,
  textSize = "text-[0.65rem]",
}: any) => {
  if (!language) {
    return <div></div>;
  }
  return (
    <>
      <div className="flex items-center">
        <LanguageIcon />
        <div className={`${textSize} text-gray-500 px-1 capitalize`}>
          {language}
        </div>
      </div>
    </>
  );
};

export const FlyingFormationChip = ({ text, textSize = "text-xs" }: any) => {
  if (Array.isArray(text)) {
    const chips = text.map((e, i) => (
      <div className="flex" key={i}>
        <Chip
          text={e}
          textSize={textSize}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
      </div>
    ));
    return <div className="flex">{chips}</div>;
  }
  return (
    <Chip
      text={text}
      textSize={textSize}
      bgColor="bg-blue-100"
      textColor="text-blue-600"
    />
  );
};

export const ClientGroupChip = ({ text, textSize = "text-xs" }: any) => {
  if (Array.isArray(text)) {
    const chips = text.map((e, i) => (
      <>
        <Chip
          text={e}
          textSize={textSize}
          bgColor="bg-orange-100"
          textColor="text-orange-700"
          key={i}
        />
      </>
    ));
    return <div className="flex">{chips}</div>;
  }
  return (
    <Chip
      text={text}
      textSize={textSize}
      bgColor="bg-orange-100"
      textColor="text-orange-700"
    />
  );
};

export const ProcessChip = ({ text, textSize = "text-xs" }: any) => {
  return (
    <Chip
      text={text}
      textSize={textSize}
      bgColor="bg-purple-100"
      textColor="text-purple-600"
    />
  );
};

export const SubProcessChip = ({ text, textSize = "text-xs" }: any) => {
  return (
    <Chip
      text={text}
      textSize={textSize}
      bgColor="bg-red-100"
      textColor="text-red-500"
    />
  );
};

export const TechnologyChip = ({ text, textSize = "text-xs" }: any) => {
  return (
    <Chip
      text={text}
      textSize={textSize}
      bgColor="bg-green-100"
      textColor="text-green-500"
    />
  );
};

export const getCoverFilename = (processName: any, languageName: any) => {
  let coverFileName = "placeholder";
  if (processName != null && SUPPORTED_PROCESS.includes(processName)) {
    if (Array.isArray(processName) && processName.length > 0) {
      coverFileName = processName[0].toLowerCase();
    } else if (typeof processName === "string") {
      coverFileName = processName.toLowerCase();
    }
  } else {
    coverFileName = "nonenglish";
    let languageVal = "";

    if (languageName != null) {
      if (Array.isArray(languageName) && languageName.length > 0) {
        languageVal = languageName[0].toLowerCase();
      } else if (typeof languageName === "string") {
        languageVal = languageName.toLowerCase();
      }
    }

    if (
      (languageVal != "" && languageVal == "english") ||
      languageVal == "hindi"
    ) {
      coverFileName = languageVal;
    }
  }

  return `${coverFileName}.jpg`;
};

export function findVoiceID(
  voiceAPI: string,
  language: string,
  gender: string
): string | undefined {
  const mapping = VOICE_MAPPING.find(
    (vm) =>
      vm.voiceAPI === voiceAPI &&
      vm.language === language &&
      vm.gender === gender
  );
  return mapping ? mapping.voiceID : "tKZQTIqwDrPzLv6MrPxF";
}

export function getAPIHeadersWithAuth(
  accessToken: string | undefined,
  apiKey: string | undefined
) {
  const headers = new Headers();
  if (typeof accessToken === "string") {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }
  if (typeof apiKey === "string") {
    headers.append("x-api-key", apiKey);
  }
  return headers;
}

export function getAPIAuthURLSuffix(
  accessToken: string | undefined,
  apiKey: string | undefined
) {
  let suffix = "";
  if (typeof accessToken === "string") {
    suffix += `&access-token=${encodeURIComponent(accessToken)}`;
  }
  if (typeof apiKey === "string") {
    suffix += `&api-key=${encodeURIComponent(apiKey)}`;
  }
  return suffix;
}
