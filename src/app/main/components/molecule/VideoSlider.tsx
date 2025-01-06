'use client';

import Slider from "react-slick";
import {useEffect, useState} from "react";
import {Video} from "@/app/main/components/molecule/VideoSequence";
import VideoInSlider from "@/app/main/components/molecule/VideoInSlider";

const axios = require("axios").create();

export default function VideoSlider() {

  const [video, setVideo] = useState<Video[]>([]);
  async function getVideo() {
    const fields = 'uri,name,pictures.sizes.link';
    const params: any = {
      fields,
    };

    const res = await axios.get(`https://api.vimeo.com/users/user89245014/videos`, {
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN ?? '3b6d54e788d3347f69d8ebedcdd2f99f'}`,
      },
      params
    });

    setVideo(video.concat(res.data.data.map((v: any) => ({
      name: v.name,
      uri: v.uri,
      picture: v.pictures.sizes[3].link
    }))));
  }

  useEffect(() => {
    getVideo().then();
  }, []);

  return (
    <div className='backColor pt-2'>
      <Slider
        infinite={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {video.map((v, i) =>
          <VideoInSlider key={i} video={v}/>
        )}
      </Slider>
      <div className='bg-transparent' style={{ height: 50 }} />
      <div style={{backgroundColor: 'rgb(198, 80, 77)', height: 50 }}>

      </div>
    </div>
  )
}