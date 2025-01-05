import Image from "next/image";

interface PageImage {
  src: string;
  alt: string;
}

export default function PageImage(props: PageImage) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={1000}
      height={1000}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  );
}