'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('5808b502-a3b5-4da9-bf99-653712d4cf93');
  });

  return null;
};

export default CrispChat;
