'use client';

import FormControl from "@/components/atom/FormControl";
import {ChangedImageFile, ImageFile} from "@/app/admin/components/organism/ImageOrder";
import React, {ChangeEvent} from "react";

interface ImageInfoProps {
  imageFile: ImageFile;
  setFilesAction: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  setChangedFilesAction: React.Dispatch<React.SetStateAction<ChangedImageFile[]>>;
}

export default function ImageInfo({ imageFile, setFilesAction, setChangedFilesAction }: ImageInfoProps) {

  function handleOrderChange(e: ChangeEvent<HTMLInputElement>) {
    setFilesAction((prev) => {
      return prev.map(p => {
        if (p.imageName === imageFile.imageName) {
          p.order = e.target.value
        }
        return p;
      });
    })
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>, imageName: string) {
    setChangedFilesAction(prev => {
      return prev.map((p) => {
        if (p.imageName === imageName && e.target.files) {
          p.file = e.target.files[0];
        }

        return p;
      })
    });
  }

  return (
    <div className='my-3 d-flex gap-3'>
      {imageFile.imageName.endsWith('.txt') ? (
        <div
          className='d-flex justify-content-center align-items-center border text-secondary'
          style={{ width: 200, height: 100 }}
        >
          동영상 모음
        </div>
      ) : (
        <img src={`data:image/jpeg;base64,${imageFile.thumbnail}`} alt={imageFile.imageName}/>
      )}
      <div className='d-flex my-auto'>
        <div style={{ width: 40 }}>순서:</div>&nbsp;
        <FormControl
          type="number"
          style={{ width: 50 }}
          value={imageFile.order}
          onChange={handleOrderChange}
        />
      </div>
      {!imageFile.imageName.endsWith('.txt') && (
        <div className='d-flex my-auto'>
          <div style={{width: 80}}>
            바꿀 파일:
          </div>
          <FormControl
            style={{width: 300}}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={e => handleFileChange(e, imageFile.imageName)}
          />
        </div>
      )}
    </div>
  )
}