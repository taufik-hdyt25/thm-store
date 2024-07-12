import Lottie from "lottie-react";
import animationData from "./loading.json";

export const Loading = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoPlay={true}
      style={{ width: 100 }}
    />
  );
};