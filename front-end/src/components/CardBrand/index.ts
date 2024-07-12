import dynamic from "next/dynamic";

const CardBrand = dynamic(import("./CardBrand"), { ssr: false });
export default CardBrand;
