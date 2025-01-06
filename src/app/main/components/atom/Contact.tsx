'use client';

import {useEffect, useState} from "react";

export default function Contact() {
  const [fontSize, setFontSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 520) {
      setFontSize(10);
    }
  }, [])

  return (
    <>
      <button
        style={{
          right: 30,
          position: "absolute",
          fontSize: fontSize,
        }}
        className='btn btn-dark btn-sm fw-bold'
        onClick={() => window.dispatchEvent(new CustomEvent('openmodal'))}
      >
        Contact Us
      </button>
    </>
  )
}