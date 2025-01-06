'use client';

import {useEffect, useState} from "react";
import ContactModal from "@/app/main/modals/ContactModal";

export default function ModalReceiver() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    const openModal = () => setOpen(true);

    window.addEventListener("openmodal", openModal);

    return () => {
      window.removeEventListener("openmodal", openModal);
    }
  }, []);

  return (
    <>
      <ContactModal onSuccess={handleSuccess} open={open} setOpen={setOpen} />
      {showSnackbar && (
        <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>
          성공적으로 메일을 보냈습니다.
        </div>
      )}
    </>
  );
}