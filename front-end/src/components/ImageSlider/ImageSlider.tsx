import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider: React.FC = (): JSX.Element => {
  const SlideData = [
    {
      image:
        "https://res.cloudinary.com/doushe6hn/image/upload/v1702733901/thm-store/banner/ny5fvq6siywxgeo8qd9p.png",
    },
    {
      image:
        "https://res.cloudinary.com/doushe6hn/image/upload/v1702734112/thm-store/banner/val1w1kqwae314ldfnbt.png",
    },
  ];
  return (
    <Carousel  infiniteLoop autoPlay stopOnHover={true}>
      {SlideData.map((item, idx) => (
        <Image rounded="lg" key={idx} src={item.image} alt="carrousel"h={{base:"200px", md:"300px"}}/>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
