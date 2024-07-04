'use client';

import React from 'react';

import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';

import useScroll from '../hooks/use-scroll';
import {cn} from '../lib/utils';
import {Logo} from '../components/logo';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[46px] items-center justify-between md:hidden">
        <div className="flex items-center w-60 px-6">
          <Link
            href="/"
            className="flex items-center w-full h-12"
          >
            <Logo/>
          </Link>
        </div>

        <div className="hidden">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">SG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
