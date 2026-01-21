import styles from './home.module.scss';
import Intro from './intro.tsx';
import Mission from './mission.tsx';
import Highlights from './highlights.tsx';
import Stats from './stats.tsx'; 
import SocialMedia from './socialMedia.tsx';
import PrayerRoomsServer from './prayerRooms';
export const dynamic = 'force-dynamic'; 
export default function HomePage() {
    return (
        <div>
            <Intro />
            <Mission />
            <Stats /> 

            <SocialMedia />
            <PrayerRoomsServer />
        </div>
    );
}
