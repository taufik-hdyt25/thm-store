import dynamic from 'next/dynamic';

const Admin = dynamic(import('./Admin'), { ssr: true });
export default Admin;
