'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('MY_CRISP_WEBSITE_ID');
  });

  return null;
};

export default CrispChat;
