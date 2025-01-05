'use client';

import {useEffect, useState} from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const useragent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(useragent)
    setIsMobile(mobile);
  }, []);

  return isMobile;
};

export default useIsMobile;