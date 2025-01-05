'use client';

import {useEffect, useState} from "react";
import ContactModal from "@/app/main/modals/ContactModal";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [buttonMargin, setButtonMargin] = useState(30);
  const [fontSize, setFontSize] = useState<number | undefined>(undefined);

  const showSuccessMessage = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  function handleSuccess() {
    setOpen(false);
    showSuccessMessage();
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 520) {
      setButtonMargin(10);
      setFontSize(10);
    }
  }, [])

  return (
    <>
      <button
        style={{
          right: buttonMargin,
          position: "absolute",
          fontSize: fontSize,
        }}
        className='btn btn-dark btn-sm fw-bold'
        onClick={() => setOpen(true)}
      >
        Contact Us
      </button>
      <ContactModal onSuccess={handleSuccess} open={open} setOpen={setOpen} />
      {showSnackbar && (
        <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>
          성공적으로 메일을 보냈습니다.
        </div>
      )}
    </>
  )
}