'use client';

import style from '../video.module.css';
import React, {useEffect, useRef, useState} from "react";
import VideoDescription from "@/app/main/components/molecule/VideoDescription";
import ShowVideo from "@/app/main/components/molecule/ShowVideo";

const axios = require("axios").create();

export interface Video {
  name: string;
  picture: string;
  uri: string;
}

export default function VideoSequence() {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [video, setVideo] = useState<Video[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState<string>('전체 카테고리');
  const [categoryValue, setCategoryValue] = useState<string>('');

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const [videoWidth, setVideoWidth] = useState(320);
  const [videoHeight, setVideoHeight] = useState(180);

  async function getVideo(page: number, category: string) {
    setLoading(true);

    try {
      const fields = 'uri,name,pictures.sizes.link';
      const params: any = {
        fields,
        per_page: 16,
        page,
      };
      if (category !== '') {
        params.category = category;
      }
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

      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickExpand() {
    if (currentPage * 16 < total) {
      setCurrentPage(currentPage + 1);
      await getVideo(currentPage + 1, categoryValue);
    }
  }

  function handleToggleOpenCategory() {
    setOpenCategory(!openCategory);
  }

  function handleClickOutside(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !textRef.current!.contains(e.target as Node)
    ) {
      setOpenCategory(false);
    }
  }

  async function handleClickMenu(value: string) {
    if (value === '') {
      setCategory("전체 카테고리");
    } else if (value === '45secondspot') {
      setCategory("45 SECONDS SPOT")
    } else {
      setCategory("ADS AND COMMERCIALS");
    }

    setCategoryValue(value);
    setOpenCategory(false);

    setVideo([]);
    setTotal(0);
    setCurrentPage(1);
    await getVideo(1, value);
  }

  useEffect(() => {
    getVideo(currentPage, categoryValue).then();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (typeof window !== "undefined") {
      if(window.innerWidth < 520) {
        setVideoWidth(160);
        setVideoHeight(90);
      } else if (window.innerWidth >= 520 && window.innerWidth < 700) {
        setVideoWidth(240);
        setVideoHeight(135);
      } else {
        setVideoWidth(320);
        setVideoHeight(180);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(selectedVideo);
  }, [selectedVideo]);

  return (
    <div className='pb-5 pt-4' style={{backgroundColor: '#BF504F', minHeight: 400 }}>
      <div className="d-flex justify-content-end">
        <div
          hidden
          style={{
            color: 'white',
            marginRight: 'calc(50vw - 668px)',
            marginBottom: 30,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <div
            ref={textRef}
            className='d-flex align-items-center gap-2'
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              opacity: '.7'
            }}
            onClick={handleToggleOpenCategory}
          >
            {category}
            {
              openCategory ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-chevron-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>
              )
            }
          </div>

          {openCategory && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                backgroundColor: 'white',
                border: "1px solid #ddd",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                marginTop: "5px",
                zIndex: "1000",
                width: "300px",
                color: "black",
              }}
            >
              <ul style={{listStyle: "none", margin: "0", padding: "10px"}}>
                <li
                  style={{padding: "8px 0", cursor: "pointer"}}
                  onClick={() => handleClickMenu("")}
                >
                  전체
                </li>
                <li
                  style={{padding: "8px 0", cursor: "pointer"}}
                  onClick={() => handleClickMenu("45secondspot")}
                >
                  45 SECONDS SPOT
                </li>
                <li
                  style={{padding: "8px 0", cursor: "pointer"}}
                  onClick={() => handleClickMenu("adsandcommercials")}
                >
                  ADS AND COMMERCIALS
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={style.gridContainer}>
        {video.map((v, i) =>
          <VideoDescription
            key={i}
            video={v}
            setSelectedVideoAction={setSelectedVideo}
            width={videoWidth}
            height={videoHeight}
          />
        )}
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <div className='border-bottom pb-2'>
          {
            loading ? (
              <div className={style.dotContainer}>
                <div className={style.dot}/>
                <div className={style.dot}/>
                <div className={style.dot}/>
              </div>
            ) : (
              currentPage * 16 > total ? <div></div> : (
                <p className={style.bottomText} onClick={handleClickExpand}>
                  더보기
                </p>
              )
            )
          }
        </div>
      </div>

      <ShowVideo selectedVideo={selectedVideo} setSelectedVideoAction={setSelectedVideo} videos={video} />
    </div>
  )
}