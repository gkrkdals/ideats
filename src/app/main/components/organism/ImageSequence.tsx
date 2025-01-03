import ImageContainer from "@/app/main/components/molecule/ImageContainer";

interface ImageSequenceProps {
  images: { src: string; alt: string }[];
}

export default function ImageSequence(props: ImageSequenceProps) {
  return props.images.map((image, i) =>
    <ImageContainer key={i} src={image.src} alt={image.alt} />
  )
}