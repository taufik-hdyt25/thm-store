import dynamic from "next/dynamic";

const Head = dynamic(import("./Head"), { ssr: false });
export default Head;
