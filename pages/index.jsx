import dynamic from 'next/dynamic';
const NextArcStudio = dynamic(() => import('../components/NextArcStudio'), { ssr: false });
export default function Home(){ return <NextArcStudio/>; }
