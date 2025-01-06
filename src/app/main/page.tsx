import Header from "@/app/main/components/atom/Header";
import ImageSequence from "@/app/main/components/organism/ImageSequence";
import Bottom from "@/app/main/components/organism/Bottom";
import ModalReceiver from "@/app/main/components/organism/ModalReceiver";

export default function Page() {
  return (
    <div>
      <Header/>
      <ImageSequence />
      <Bottom />
      <ModalReceiver />
    </div>
  );
}
