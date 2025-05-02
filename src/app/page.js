
'use client';

import Header from '@/components/ui/Header';
import MobilePreview from '@/components/ui/MobilePreview';
import LinkEditor from '@/components/ui/LinkEditor';
import { useState } from 'react';

export default function DashboardPage() {
  const [links, setLinks] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header className="hidden md:block" /> {/* Desktop only */}

      {/* <main className="flex flex-col lg:flex-row h-full pb-16 md:pb-0">
        <div className="hidden lg:flex lg:w-1/2 border-r border-gray-200 justify-center items-center p-6">
          <MobilePreview links={links} />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 max-w-3xl mx-auto">
          <LinkEditor links={links} setLinks={setLinks} />
        </div>
      </main>       */}
      <main className="mt-6 flex flex-col lg:flex-row h-full pb-16 md:pb-0">
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-6">
          <MobilePreview links={links} />
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 max-w-3xl mx-auto">
          <LinkEditor links={links} setLinks={setLinks} />
        </div>
      </main>

    </div>
  );
}
