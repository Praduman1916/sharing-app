
'use client';

import Header from '@/components/ui/Header';
import MobilePreview from '@/components/ui/MobilePreview';
import LinkEditor from '@/components/ui/LinkEditor';
import { useState } from 'react';

export default function DashboardPage() {
  const [links, setLinks] = useState([]);

  return (
    <div className="min-h-screen relative">
      <Header className="hidden md:block" />
      <main className="mt-6 flex flex-col lg:flex-row h-full pb-16 md:pb-0 gap-6">
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
          <MobilePreview links={links} />
        </div>
        <div className="w-full lg:w-1/2 max-w-3xl mx-auto overflow-y-auto">
          <LinkEditor links={links} setLinks={setLinks} />
        </div>
      </main>

    </div>
  );
}
