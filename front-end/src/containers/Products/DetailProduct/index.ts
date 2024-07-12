import dynamic from 'next/dynamic';

const DetailProduct = dynamic(import('./DetailProduct'), { ssr: true });
export default DetailProduct;
