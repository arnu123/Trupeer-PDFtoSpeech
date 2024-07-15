"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const IS_DEMO_THEME = process.env.NEXT_PUBLIC_THEME === "trupeer_demo";
const Logo = () => {
  return IS_DEMO_THEME ? (
    <img
      src="C:\Users\ARNAV AGARWAL\OneDrive - Indian Institute of Technology Bombay\Desktop\testingbhashini\public\images\assets\common\trupeer-logo-hd.png"
      alt="Logo"
      className="w-24 h-24"
    />
  ) : (
    <img
      src="/assets/common/Acc_Logo_Black_Purple_RGB.png"
      alt="Logo"
      className="w-3/5"
    />
  );
};

const LogoSmall = () => {
  return IS_DEMO_THEME ? (
    <img
      src="/assets/common/trupeer-logo-hd.png"
      alt="Logo"
      className="w-12 h-12"
    />
  ) : (
    <LogoCheveron />
  );
};

const LogoNav = () => {
  return (
    <div>
      <Link
        href="/"
        className={`flex flex-row items-center justify-center space-x-3 md:justify-start md:px-6 h-12 w-full ${
          IS_DEMO_THEME ? "hidden" : ""
        }`}
      >
        <Logo />
      </Link>
      <Link
        href="/"
        className={`flex flex-row items-center justify-center ${
          !IS_DEMO_THEME ? "hidden" : ""
        }`}
      >
        <div className="text-3xl font-light">
          Tru<span className="text-purple-ai">peer</span>.ai
        </div>
      </Link>
    </div>
  );
};

const LogoWhiteCheveron = () => {
  return (
    <div className="flex">
      <img src="/assets/LogoCheveron.png" alt="Logo" className="w-3/5" />
    </div>
  );
};

const LogoCheveron = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="36" height="36" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_878_2856" transform="scale(0.0025)" />
        </pattern>
        <image
          id="image0_878_2856"
          width="400"
          height="400"
          xlinkHref="data:image/jpeg;base64,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"
        />
      </defs>
    </svg>
  );
};

const LogoSignin = () => {
  return (
    <div className="p-12">
      <Image
        className={`${IS_DEMO_THEME ? "hidden" : ""}`}
        src="/assets/common/accenture-logo-with-name.png"
        alt="Logo"
        width={150}
        height={41}
      />
      <div
        className={`text-3xl font-light text-white ${
          !IS_DEMO_THEME ? "hidden" : ""
        }`}
      >
        Tru<span className="text-purple-ai">peer</span>.ai
      </div>
    </div>
  );
};

export {
  Logo,
  LogoCheveron,
  LogoWhiteCheveron,
  LogoSmall,
  LogoNav,
  LogoSignin,
};
