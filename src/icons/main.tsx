"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";

const LibraryIcon = () => {
  return <Icon icon="lucide:library" width="48" height="48" color="white" />;
};

const NextIcon = ({ name, width, height, color, className }: any) => {
  return (
    <Icon
      icon={`lucide:${name}`}
      width={width}
      height={height}
      className={className}
      color={color}
    />
  );
};

const LanguageIcon = () => {
  return (
    <Icon
      icon="material-symbols:language"
      width="18"
      height="18"
      color="grey"
    />
  );
};

const DeleteIcon = () => {
  return <Icon icon="lucide:trash" />;
};

const PdfIcon = () => {
  return <Icon icon="vscode-icons:file-type-pdf2" width="48" height="48" />;
};

const PngIcon = () => {
  return <Icon icon="vscode-icons:file-type-png" width="48" height="48" />;
};

const VideoLibraryIcon = ({ width, height }: any) => {
  return (
    <Image
      src="/assets/icons/youtube-underline.png"
      alt="Logo"
      width={width}
      height={height}
    />
  );
};

const PlusIcon = ({ width, height, color }: any) => {
  return (
    <Icon icon="lucide:plus" width={width} height={height} color={color} />
  );
};

const PlayIcon = ({ fill, className }: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 60 67"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Regular-S">
        <path
          id="Path"
          fill={fill}
          stroke="none"
          d="M 5.976074 66.314453 C 6.822388 66.314453 7.628052 66.167969 8.393066 65.875 C 9.158081 65.582031 9.947388 65.191406 10.76123 64.703125 L 54.706543 39.410156 C 56.496948 38.36853 57.733887 37.448853 58.41748 36.651367 C 59.101074 35.853882 59.442871 34.901733 59.442871 33.794922 C 59.442871 32.68811 59.101074 31.735962 58.41748 30.938477 C 57.733887 30.140991 56.496948 29.221313 54.706543 28.179688 L 10.76123 2.886719 C 9.947388 2.398438 9.158081 2.007813 8.393066 1.714844 C 7.628052 1.421875 6.822388 1.275391 5.976074 1.275391 C 4.446167 1.275391 3.233521 1.820679 2.338379 2.911133 C 1.443237 4.001587 0.995605 5.458374 0.995605 7.28125 L 0.995605 60.308594 C 0.995605 62.13147 1.443237 63.588257 2.338379 64.678711 C 3.233521 65.769165 4.446167 66.314453 5.976074 66.314453 Z"
        />
      </g>
    </svg>
  );
};

const CreateVideoNavIcon = ({ color }: any) => {
  return <Icon icon="lucide:square-pen" width="20" height="20" color={color} />;
};

const VideoLibraryNavIcon = ({ color }: any) => {
  return <Icon icon="lucide:images" width="20" height="20" color={color} />;
};

const HomeNavIcon = ({ color }: any) => {
  return <Icon icon="lucide:home" width="20" height="20" color={color} />;
};

export {
  LibraryIcon,
  NextIcon,
  LanguageIcon,
  DeleteIcon,
  PdfIcon,
  VideoLibraryIcon,
  PlusIcon,
  PlayIcon,
  CreateVideoNavIcon,
  VideoLibraryNavIcon,
  HomeNavIcon,
};
