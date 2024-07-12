import dynamic from "next/dynamic";

const CartItem = dynamic(import("./CartItem"), { ssr: false });
export default CartItem;
