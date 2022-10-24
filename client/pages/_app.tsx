import '../styles/globals.css'
import "semantic-ui-css/semantic.min.css";
import styles from './../styles/App.module.scss'
import type { AppProps } from 'next/app'
import AnimatedBackground from '../components/AnimatedBackground/AnimatedBackground';
import SideBar from '../components/SideBar/SideBar';
import UnderConstruction from '../components/UnderConstruction/UnderConstruction';

function MyApp({ Component, pageProps }: AppProps) {
  const sideBarWidth = '12rem';
  
  return (
    <div className={`${styles.App} ${styles.darkTheme}`} role="application">
      <UnderConstruction />
      
      <AnimatedBackground />

      <div className={styles.content}>
          <SideBar sideBarWidth={sideBarWidth} />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp
