'use client';

import {Video} from "@/app/main/components/molecule/VideoSequence";
import Image from "next/image";
import styles from '../video.module.css';

interface VideoDescriptionProps {
  video: Video;
  setSelectedVideoAction: (video: Video | null) => void;
  width: number;
  height: number;
}

export default function VideoDescription({ video, setSelectedVideoAction, height, width }: VideoDescriptionProps) {
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
          fontSize: window.innerWidth < 520 ? 12 : 18,
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