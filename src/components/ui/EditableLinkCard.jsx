'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dragIcon from '../../../public/images/icon-drag-and-drop.svg';
import chevronDown from '../../../public/images/icon-chevron-down.svg';
import iconLink from '../../../public/images/icon-link.svg';
import githubIcon from '../../../public/images/icon-github.svg'; // example icon
import { platformOptions } from '@/lib/platformOptions';

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

    const getExpectedPrefix = (platform) => {
        switch (platform.toLowerCase()) {
            case 'github':
                return 'https://www.github.com/';
            case 'youtube':
                return 'https://www.youtube.com/';
            case 'linkedin':
                return 'https://www.linkedin.com/';
            case 'frontend mentor':
                return 'https://www.frontendmentor.io/';
            default:
                return 'https://';
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
            {/* Top Row */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm cursor-move" {...dragHandleProps}>
                    <Image src={dragIcon} alt="drag" width={16} height={16} />
                    <span className="font-bold h-6  text-[#737373] leading-6 ">Link #{index + 1}</span>
                </div>
                <button
                    onClick={() => onRemove(index)}
                    className="text-sm text-gray-400 font-medium hover:text-gray-600"
                >
                    Remove
                </button>
            </div>

            {/* Platform Dropdown */}
            <div className="mb-3 relative">
                <label className="text-[#737373] block mb-1 h-[18px] leading-[18px]">Platform</label>
                <div
                    className="flex items-center gap-2 p-2 border border-[#D9D9D9] rounded-md bg-white cursor-pointer relative "
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <Image src={current.icon} alt={platform} width={20} height={20} />
                    <span className="text-sm">{current.label}</span>
                    <Image src={chevronDown} alt="Chevron" width={16} height={16} className="ml-auto" />
                </div>

                {dropdownOpen && (
                    <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-md z-10 overflow-hidden border border-[#D9D9D9]">
                        <ul>
                            {platformOptions.map((item, idx) => (
                                <li
                                    key={item.value}
                                    onClick={() => handlePlatformChange(item)}
                                    className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer ${idx !== platformOptions.length - 1 ? 'border-b border-[#D9D9D9]' : ''
                                        }`}
                                >
                                    <Image src={item.icon} alt={item.label} width={20} height={20} />
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Link Input + Error */}
            <div>
                <label className="text-[#737373] block mb-1 h-[18px] leading-[18px]">Link</label>
                <div className="relative">
                    <Image
                        src={iconLink}
                        alt="link icon"
                        width={16}
                        height={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />

                    {/* Error message on the right INSIDE input */}
                    {error && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-red-500">
                            {error}
                        </span>
                    )}

                    {/* Input Field */}
                    <input
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder={`e.g. ${getExpectedPrefix(platform)}yourname`}
                        className={`pl-10 pr-24 w-full p-2 rounded-md text-sm placeholder:text-sm ${error
                                ? 'border border-red-500 text-gray-700 placeholder:text-gray-400'
                                : 'border border-[#D9D9D9] text-gray-700 placeholder:text-gray-400'
                            }`}
                    />
                </div>
            </div>

        </div>
    );
}
