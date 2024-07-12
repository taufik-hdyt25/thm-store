

import dynamic from 'next/dynamic';

const MyProfile = dynamic(import('./../partials/Profile'), { ssr: true });
const Transaction = dynamic(import('./../partials/Transaction'), { ssr: false });
export {Transaction,MyProfile}
