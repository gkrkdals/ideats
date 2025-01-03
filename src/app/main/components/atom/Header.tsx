import Image from "next/image";
import Contact from "@/app/main/components/atom/Contact";

export default function Header() {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-sticky sticky-top"
      style={{
        height: 'calc(100vw * 0.05)',
      }}
    >
      <Image
        style={{ position: 'absolute',  }}
        src={"/image/title.jpg"}
        alt={"header"}
        fill={true}
        quality={100}
      />
      <Contact />
    </div>
  );
}