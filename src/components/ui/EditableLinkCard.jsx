'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dragIcon from '../../../public/images/icon-drag-and-drop.svg';
import chevronDown from '../../../public/images/icon-chevron-down.svg';
import iconLink from '../../../public/images/icon-link.svg';
import { platformOptions } from '@/lib/platformOptions';
import { getExpectedPrefix } from '@/lib/getExpectedPrefix';

export default function EditableLinkCard({
    index,
    data,
    onUpdate,
    onRemove,
    dragHandleProps = {},
}) {
    const [platform, setPlatform] = useState(data.platform || 'GitHub');
    const [url, setUrl] = useState(data.url || '');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef(null);

    const current = platformOptions.find((p) => p.label === platform) || platformOptions[0];

    useEffect(() => {
        validate();
    }, [url, platform]);

    const validate = () => {
        if (!url.trim()) {
            setError("Can't be empty");
        } else if (!url.startsWith(getExpectedPrefix(platform))) {
            setError('Please check the URL');
        } else {
            setError('');
        }
        onUpdate(index, { platform, url, error });
    };

    const handlePlatformChange = (item) => {
        setPlatform(item.label);
        setDropdownOpen(false);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div className="bg-[#FAFAFA] p-5 rounded-[12px] w-full max-w-full min-h-[228px] mb-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div
                    className="flex items-center gap-2 text-sm text-[#737373] cursor-move font-instrument"
                    {...dragHandleProps}
                >
                    <Image src={dragIcon} alt="drag" width={16} height={16} />
                    <span className="font-bold">Link #{index + 1}</span>
                </div>
                <button
                    onClick={() => onRemove(index)}
                    className="flex items-center gap-1 text-sm font-medium text-[#737373] font-instrument 
             hover:text-red-500 hover:underline
             transition-colors duration-200"
                >
                    Remove
                </button>
            </div>
            <div className="relative font-instrument" ref={dropdownRef}>
                <label className="text-[#737373] text-sm mb-1 block">Platform</label>

                <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    tabIndex={0}
                    className={`flex items-center gap-2 px-4 py-[10px] border rounded-md bg-white cursor-pointer transition
            ${dropdownOpen ? 'border-violet-600 shadow-md' : 'border-[#D9D9D9]'}
            focus:outline-none focus:ring-2 focus:ring-violet-500`}
                >
                    <Image src={current.icon} alt={platform} width={20} height={20} />
                    <span className="text-sm">{current.label}</span>
                    <Image src={chevronDown} alt="Chevron" width={16} height={16} className="ml-auto" />
                </div>

                {/* {dropdownOpen && (
                    <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-md z-10 overflow-hidden border border-[#D9D9D9]">
                        <ul>
                            {platformOptions.map((item, idx) => (
                                <li
                                    key={item.value}
                                    onClick={() => handlePlatformChange(item)}
                                    className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-2
                    text-gray-800 hover:text-[#633CFF]
                    ${idx !== platformOptions.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        width={20} height={20} />
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
                {dropdownOpen && (
                    <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-md z-10 overflow-hidden border border-[#D9D9D9]">
                        <ul>
                            {platformOptions.map((item, idx) => (
                                <li
                                    key={item.value}
                                    onClick={() => handlePlatformChange(item)}
                                    className={`group flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-all duration-200
            ${idx !== platformOptions.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                                >          <div className="relative w-5 h-5">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={20}
                                            height={20}
                                            className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
                                        />
                                        <Image
                                            src={item.icon}
                                            alt={`${item.label}-hover`}
                                            width={20}
                                            height={20}
                                            className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                                            style={{
                                                filter:
                                                    'brightness(0) saturate(100%) invert(27%) sepia(90%) saturate(2456%) hue-rotate(235deg) brightness(97%) contrast(92%)',
                                            }}
                                        />
                                    </div>
                                    <span className="text-gray-800 group-hover:text-[#633CFF] transition-colors duration-200">
                                        {item.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>


            <div>
                <label className="text-[#737373] text-sm font-instrument mb-1 block">Link</label>
                <div className="relative">
                    <Image
                        src={iconLink}
                        alt="link icon"
                        width={16}
                        height={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    {error && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-red-500">
                            {error}
                        </span>
                    )}
                    <input
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder={`e.g. ${getExpectedPrefix(platform)}yourname`}
                        className={`pl-10 pr-24 w-full p-2 text-sm rounded-md font-instrument placeholder:text-sm ${error
                            ? 'border border-red-500 text-gray-700 placeholder:text-gray-400'
                            : 'border border-[#D9D9D9] text-gray-700 placeholder:text-gray-400'
                            }`}
                    />
                </div>
            </div>
        </div>
    );
}
