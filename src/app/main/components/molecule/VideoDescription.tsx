'use client';

import {Video} from "@/app/main/components/molecule/VideoSequence";
import Image from "next/image";
import styles from '../video.module.css';
import {useEffect, useState} from "react";

interface VideoDescriptionProps {
  video: Video;
  setSelectedVideoAction: (video: Video | null) => void;
  width: number;
  height: number;
}

export default function VideoDescription({ video, setSelectedVideoAction, height, width }: VideoDescriptionProps) {
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 520) {
      setFontSize(12);
    }
  }, []);

  return (
    <div className='mb-2'>
      <div
        className='imageContainer'
        onClick={() => setSelectedVideoAction(video)}
      >
        <Image
          src={video.picture}
          alt={video.name}
          width={width}
          height={height}
          quality={100}
          className='image'
        />
        <div className='overlay'>
          <span className='text'>
            <div className='d-flex justify-content-center align-items-center'>
              <Image src='/icon/img.png' alt='icon' width={40} height={40} />
              <div>
                동영상 보기
              </div>
            </div>
          </span>
        </div>
      </div>
      <h3
        style={{
          marginTop: 24,
          marginLeft: 20,
          marginRight: 20,
          color: "white",
          fontSize,
          cursor: 'pointer'
        }}
        className={styles.bottomText}
        onClick={() => setSelectedVideoAction(video)}
      >
        {video.name}
      </h3>
    </div>
  );
}