import useIsMobile from "@/hooks/useIsMobile";

const useBackgroundColor = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return '#141E26';
  } else {
    return 'rgb(198, 80, 77)';
  }
};

export default useBackgroundColor;