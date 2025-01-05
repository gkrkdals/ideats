import Image from "next/image";
import Contact from "@/app/main/components/atom/Contact";

export default function Header() {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-sticky sticky-top titleHeader"
    >
      <Image
        className="titleImage"
        src={"/image/title.jpg"}
        alt={"header"}
        fill
        quality={100}
      />
      <Contact />
    </div>
  );
}