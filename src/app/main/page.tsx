import * as fs from "fs";
import * as path from "path";
import Header from "@/app/main/components/atom/Header";
import ImageSequence from "@/app/main/components/organism/ImageSequence";

function getImages() {
  const directoryPath = path.join(process.cwd(), "public/image");
  const files = fs.readdirSync(directoryPath);

  return files
    .filter((file) => !isNaN(parseInt(file.split('.').at(0) ?? '')))
    .map((file) => ({ src: '/image/' + file, alt: file.split('.').at(0) ?? '' }));
}

export default function Page() {
  const images = getImages();

  return (
    <div>
      <Header/>
      <ImageSequence images={images} />
    </div>
  );
}
