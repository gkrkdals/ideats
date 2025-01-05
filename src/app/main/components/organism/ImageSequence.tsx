import ImageContainer from "@/app/main/components/molecule/ImageContainer";
import VideoSequence from "@/app/main/components/molecule/VideoSequence";

interface ImageSequenceProps {
  images: { src: string; alt: string }[];
}

export default function ImageSequence(props: ImageSequenceProps) {
  return props.images.map((image, i) => {
    if (image.src.split(".").at(-1) === "txt") {
      return <VideoSequence />;
    } else {
      return <ImageContainer key={i} src={image.src} alt={image.alt} />
    }
  });
}