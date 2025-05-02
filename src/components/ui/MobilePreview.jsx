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

    return (
        <div className="relative flex flex-col items-center justify-center bg-gray-50 w-full h-full rounded-lg border border-gray-200 p-4 md:p-6">
            {/* Phone Frame */}
            <div className="relative w-[280px] md:w-[300px]">
                <Image
                    src={phoneMockup}
                    alt="Phone Mockup"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                    priority
                />

                {/* Content Inside Phone */}
                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[200px] md:w-[220px] flex flex-col items-center">

                    {/* 👤 Profile Section */}
                    <div className="relative mb-6">
                        {/* Background Shadow */}
                        <div className="w-24 h-24 bg-gray-200 rounded-full absolute top-1 left-1/2 -translate-x-1/2 z-0" />
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-gray-400 rounded-full relative z-10 mx-auto" />
                    </div>

                    {/* Name + Subtitle Bars */}
                    <div className="w-28 h-4 bg-gray-300 rounded-full mb-2" />
                    <div className="w-20 h-3 bg-gray-200 rounded-full mb-6" />

                    {/* 🔗 Link Buttons */}
                    <div className="w-full flex flex-col gap-3">
                        {links.map((link, i) => {
                            const { icon, color } = getPlatformStyle(link.platform);
                            return (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-between px-4 py-2 text-white text-sm font-semibold rounded-lg ${color}`}
                                >
                                    <div className="flex items-center gap-2">
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