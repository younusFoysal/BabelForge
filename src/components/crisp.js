'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';
import { usePathname } from 'next/navigation';

const CrispChat = () => {
  const location = usePathname();
  useEffect(() => {
    if (location?.includes('dashboard')) return null;
    Crisp.configure('5808b502-a3b5-4da9-bf99-653712d4cf93');
  }, [location]);

  return null;
};

export default CrispChat;
