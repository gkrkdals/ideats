'use client';

import {ComponentPropsWithoutRef, forwardRef} from "react";

export interface FormControlProps extends ComponentPropsWithoutRef<'input'> {}

export interface FormControlTextAreaProps extends ComponentPropsWithoutRef<'textarea'> {}

export default function FormControl(props: FormControlProps) {
  return (
    <input
      {...props}
      type="text"
      className="form-control form-control-sm"
      style={{ fontSize: '9pt' }}
    />
  )
}

export const FormControlTextArea = forwardRef<HTMLTextAreaElement, FormControlTextAreaProps>((props, ref) => {
  return <textarea ref={ref} {...props} className='form-control form-control-sm' style={{ resize: 'none', fontSize: '9pt' }}></textarea>;
})

export interface FormLabelProps extends ComponentPropsWithoutRef<'label'> {}

export function FormLabel(props: FormLabelProps) {
  return <label {...props} className='form-label'>{props.children}</label>
}