import dynamic from "next/dynamic";

const WishlistItem = dynamic(import("./Wishlist"), { ssr: false });
export default WishlistItem;
