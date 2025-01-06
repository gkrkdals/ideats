'use client';

import ImageContainer from "@/app/main/components/molecule/ImageContainer";
import VideoSequence from "@/app/main/components/molecule/VideoSequence";
import {useEffect, useState} from "react";
import {client} from "@/util/axios";
import useIsMobile from "@/hooks/useIsMobile";
import VideoSlider from "@/app/main/components/molecule/VideoSlider";

interface IImage { src: string; alt: string }

export default function ImageSequence() {
  const [images, setImages] = useState<IImage[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    client
      .get('/api/client/image-name')
      .then(res => {
        setImages(res.data.map((image: string) => ({
          src: `/api/client/${image}`,
          alt: image
        })));
      })
  }, []);

  return (
    <>
      <div style={{ height: isMobile ? 130 : 70 }} />
      {images.map((image, i) => {
        if (image.src.split(".").at(-1) === "txt") {
          return isMobile ? <VideoSlider key={i} /> : <VideoSequence key={i} />;
        } else {
          return <ImageContainer key={i} src={image.src} alt={image.alt} />
        }
      })}
    </>
  )
}