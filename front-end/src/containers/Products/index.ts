import dynamic from 'next/dynamic';

const Products = dynamic(import('./Products'), { ssr: true });
export default Products;
