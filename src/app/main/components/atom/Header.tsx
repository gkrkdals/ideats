'use client';

import Image from "next/image";
import Contact from "@/app/main/components/atom/Contact";
import useIsMobile from "@/hooks/useIsMobile";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <div className='position-sticky sticky-top'>
      <div className='titleHeaderTopper'>
        <div className='d-flex justify-content-end align-items-center flex-grow-1'>
          {isMobile && <Contact/>}
        </div>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center position-sticky titleHeader border-bottom"
      >
        <Image
          className="titleImage"
          src={"/api/client/title.png"}
          alt={"header"}
          width={isMobile ? 300 : 381}
          height={isMobile ? 40 : 51}
          quality={100}
        />
        {!isMobile && <Contact />}
      </div>
    </div>
  );
}

// 나누기 381 곱하기 51