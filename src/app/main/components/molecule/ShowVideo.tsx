'use client';

import {Video} from "@/app/main/components/molecule/VideoSequence";
import ReactPlayer from "react-player/vimeo";
import {useEffect, useState} from "react";

interface ShowVideoProps {
  selectedVideo: Video | null;
  setSelectedVideoAction: (video: Video | null) => void;
  videos: Video[];
}

export default function ShowVideo({ selectedVideo, setSelectedVideoAction, videos }: ShowVideoProps) {

  const [videoReady, setVideoReady] = useState(false);

  const [width, setWidth] = useState('600px');
  const [height, setHeight] = useState('335px');

  function getUrl(uri: string) {
    const id = uri.split("/").at(-1);
    console.log(`https://vimeo.com/${id}`);
    return `https://vimeo.com/${id}`;
  }

  function handleClose() {
    setVideoReady(false);
    setSelectedVideoAction(null);
  }

  function onReady() {
    console.log("woohooo");
    setVideoReady(true);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 600) {
      setWidth("300px");
      setHeight("168px");
    }
  }, []);

  return (
    selectedVideo && (
      <div className='videoOverlay'>
        <div className='d-flex justify-content-end mt-4 me-4 text-white' style={{ fontSize: 22, cursor: 'pointer' }} onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </div>
        <div className='videoOverlaySecond'>
          {!videoReady && (
            <h3 className='text-white'>
              로딩 중...
            </h3>
          )}
          <div hidden={!videoReady}>
            <ReactPlayer
              url={getUrl(selectedVideo.uri)}
              controls
              width={width}
              height={height}
              onReady={onReady}
            />
          </div>
        </div>
      </div>
    )
  );
}