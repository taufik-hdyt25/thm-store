import dynamic from "next/dynamic";

const Layout = dynamic(import("./Layout"), { ssr: false });
export default Layout;
