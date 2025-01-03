'use client';
import style from './style.module.css';
import React from "react";

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  width?: number;
}

export default function Modal(props: ModalProps) {
  return (
    props.open && (
      <div
        className={style.overlay}
        onClick={() => props.setOpen(false)}
      >
        <div
          className={style.modal}
          onClick={e => e.stopPropagation()}
          style={{
            width: props.width,
            maxHeight: '95vh',
            overflow: 'auto',
          }}
        >
          {props.children}
        </div>
      </div>
    )
  );
}

export function ModalTitle({ children }: { children?: React.ReactNode }) {
  return (
    <h5 className='d-flex justify-content-center'>
      {children}
    </h5>
  )
}

export function ModalContent({ children }: { children?: React.ReactNode }) {
  return (
    <div className='px-2 py-2'>
      {children}
    </div>
  )
}

export function ModalActions({ children }: { children?: React.ReactNode }) {
  return (
    <div className='d-flex justify-content-center gap-3'>
      {children}
    </div>
  )
}