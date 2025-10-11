import styles from '../styles/footer.module.scss';
import Link from 'next/link';
import { StemmEmail } from '@/lib/globalVariables';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} STEM Muslims. All rights reserved.</p>
        <div className={styles.links}>
          <a href="https://www.termsfeed.com/live/ed3fbf46-2ed8-4617-9af0-a22836194da2">Privacy Policy</a>
          <a href="https://www.termsfeed.com/live/c0b28129-cdd0-4c62-a056-12a418ef31e0">Terms of Service</a>
          <Link href={`mailto:${StemmEmail}`}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

