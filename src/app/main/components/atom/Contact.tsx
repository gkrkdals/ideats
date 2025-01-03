'use client';

import {useState} from "react";
import ContactModal from "@/app/main/modals/ContactModal";

export default function Contact() {
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

  return (
    <>
      <button
        style={{
          right: 30,
          position: "absolute",
        }}
        className='btn btn-dark btn-sm fw-bold'
        onClick={() => setOpen(true)}
      >
        Contact Us
      </button>
      <ContactModal onSuccess={handleSuccess} open={open} setOpen={setOpen} />
      {showSnackbar && (
        <div className="rounded" style={{ width: 300 }}>
          성공적으로 메일을 보냈습니다.
        </div>
      )}
    </>
  )
}