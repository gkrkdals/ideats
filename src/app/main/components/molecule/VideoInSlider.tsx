import {Video} from "@/app/main/components/molecule/VideoSequence";
import Image from "next/image";
import styles from '../video-slide.module.css';

interface VideoInSliderProps {
  video: Video;
}

export default function VideoInSlider({ video }: VideoInSliderProps) {

  async function handleShare() {
    window.open(`https://vimeo.com/${video.uri.split("/").at(-1)}`, '_blank');
    // if (typeof navigator !== "undefined" && navigator.share !== undefined) {
    //   try {
    //     await navigator.share({
    //       title: video.name,
    //       text: video.name,
    //       url: `https://vimeo.com/${video.uri.split("/").at(-1)}`
    //     })
    //   } catch (e) {
    //     console.error("공유 실패");
    //   }
    // } else {
    //   alert('공유 기능을 지원하지 않는 브라우저입니다.')
    // }
  }

  return (
    <div className={styles.imageContainer} onClick={handleShare}>
      <Image
        className='d-block'
        src={video.picture}
        alt={video.name}
        width={600}
        height={360}
        layout="responsive"
      />
      <div className={styles.overlay}>
        <div>
          <p className='text-white' style={{fontSize: '1.2rem', textDecoration: 'underline'}}>
            {video.name}
          </p>
          <p></p>
          <div className='d-flex justify-content-center align-items-center text-white'>
            <Image src="/icon/img.png" alt="재생 아이콘" width={32} height={32}/>
            동영상 보기
          </div>
        </div>
      </div>
    </div>
  );
}