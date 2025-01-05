import Image from "next/image";

interface PageImage {
  src: string;
  alt: string;
}

export default function PageImage(props: PageImage) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={800}
      height={800}
      quality={100}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  );
}