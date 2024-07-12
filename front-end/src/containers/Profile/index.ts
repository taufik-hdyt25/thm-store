import dynamic from 'next/dynamic';

const Profile = dynamic(import('./Profile'), { ssr: true });
export default Profile;
