import dynamic from "next/dynamic";

const Footer = dynamic(import("./Footer"), { ssr: false });
export default Footer;
