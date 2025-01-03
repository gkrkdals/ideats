import PageImage from "@/app/main/components/atom/PageImage";

interface ImageContainerProps {
  src: string;
  alt: string;
}

export default function ImageContainer(props: ImageContainerProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <PageImage src={props.src} alt={props.alt} />
    </div>
  );
}