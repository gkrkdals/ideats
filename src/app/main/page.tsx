import * as fs from "fs";
import * as path from "path";
import Header from "@/app/main/components/atom/Header";
import ImageSequence from "@/app/main/components/organism/ImageSequence";
import Bottom from "@/app/main/components/organism/Bottom";

export default function Page() {
  return (
    <div>
      <Header/>
      <ImageSequence />
      <Bottom />
    </div>
  );
}
