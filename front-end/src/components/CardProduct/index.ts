import dynamic from "next/dynamic";

const CardProduct = dynamic(import("./CardProduct"), { ssr: false });
export default CardProduct;
