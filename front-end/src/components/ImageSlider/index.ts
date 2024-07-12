import dynamic from "next/dynamic";

const ImageSlider = dynamic(import("./ImageSlider"), { ssr: false });
export default ImageSlider;
