'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CripsHandle = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Ensure client-side rendering
  //console.log(router);
  // Ensure the component only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // If not on the client or router is null, do Nothing
    if (!isClient || !router || !router.isReady || typeof window === 'undefined' || !window.$crisp) return;

    const handleRouteChange = () => {
      //console.log('Hiding Crisp chat...');
      window.$crisp.push(['do', 'chat:hide']);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the listener on unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isClient, router]); // Dependencies include router readiness and client mount check

  return null;
};

export default CripsHandle;
