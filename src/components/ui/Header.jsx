'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import iconLinksHeader from '../../../public/images/icon-links-header.svg';
import iconLink from '../../../public/images/icon-link.svg';
import profileIcon from '../../../public/images/icon-profile-details-header.svg';
import viewIcon from '../../../public/images/icon-preview-header.svg';

export default function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('links');
  const isActive = (tab) => activeTab === tab;

  const tabs = [
    {
      name: 'Links',
      key: 'links',
      icon: iconLink,
    },
    {
      name: 'Profile Details',
      key: 'profile',
      icon: profileIcon,
    },
  ];

  return (
    <header className="w-full bg-white shadow px-4 py-4 rounded-[12px] h-[78px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={iconLinksHeader}
            alt="DevLinks logo"
            width={28}
            height={28}
            className="shrink-0 bg-[#633CFf] rounded"
          />
          <span className="text-lg font-bold text-violet-700 hidden sm:inline">devlinks</span>
        </div>

        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${isActive(tab.key)
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-gray-500 hover:text-violet-700'
                }`}
            >
              <Image
                src={tab.icon}
                alt={`${tab.name} icon`}
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
        <Link
          href="/preview"
          className="flex items-center justify-center border border-violet-600 text-violet-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-violet-50 transition text-sm font-medium whitespace-nowrap"
        >
          <Image src={viewIcon} alt="Preview" width={18} height={18} className="sm:hidden" />
          <span className="hidden sm:inline">Preview</span>
        </Link>
      </div>
    </header>
  );
}
