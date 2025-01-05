import PageImage from "@/app/main/components/atom/PageImage";
import useIsMobile from "@/hooks/useIsMobile";

interface ImageContainerProps {
  src: string;
  alt: string;
}

export default function ImageContainer(props: ImageContainerProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className='d-flex justify-content-center pt-3 px-4 px-lg-0 backColor'
    >
      <div
        style={{
          position: 'relative',
          width: isMobile ? undefined : 984,
        }}
      >
        <PageImage src={props.src} alt={props.alt}/>
      </div>
    </div>
  );
}