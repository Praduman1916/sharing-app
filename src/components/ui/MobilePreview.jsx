'use client'

import Image from 'next/image';
import phoneMockup from '../../../public/images/illustration-phone-mockup.svg';
import { platformOptions } from '@/lib/platformOptions';

export default function MobilePreview({ links }) {
  const getPlatformStyle = (platform) => {
    const found = platformOptions.find((p) => p.label === platform);
    return {
      icon: found?.icon,
      color: found?.color || 'bg-gray-300',
    };
  };
  // console.log("links",links)
  return (
    <div className="relative flex flex-col items-center justify-center bg-white w-full h-full rounded-lg shadow py-10 px-6 lg:py-[101px] lg:px-[126px]">
      <div className="relative w-[307px] h-[631px] md:w-[300px] mx-auto">
        <Image
          src={phoneMockup}
          alt="Phone Mockup"
          width={300}
          height={600}
          className="w-full h-auto"
          priority
        />

        <div className="absolute top-[270px] left-1/2 -translate-x-1/2 w-[200px] md:w-[220px] flex flex-col items-center">
          <div className="w-full max-h-[280px] overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-300">
            {links.map((link, i) => {
              const { icon, color } = getPlatformStyle(link.platform);
              return (
                <a
                  key={i}
                  href={link.url ? link.url : '#'}
                  target={link.url ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-4 py-[13px]  text-white text-sm font-normal rounded-lg ${color}`}
                >
                  <div className="flex items-center font-instrument gap-2">
                    <Image src={icon} alt={link.platform} width={16} height={16} />
                    {link.platform}
                  </div>
                  <span>→</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}