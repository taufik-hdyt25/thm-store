import dynamic from "next/dynamic";

const DrawerCart = dynamic(import("./DrawerCart"), { ssr: false });
const DrawerWichlist = dynamic(import("./DrawerWichlist"), { ssr: false });
export {DrawerCart,DrawerWichlist}
