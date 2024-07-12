import dynamic from "next/dynamic";

const Empty = dynamic(import("./Empty"), { ssr: false });
export default Empty;
