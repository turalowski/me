import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useVanta } from '../hooks';
import { socials } from '../utils';
import ProfilePhoto from '../assets/photo.jpg';
import styles from '../styles/Me.module.css';

export default function Me() {
  const { vantaRef } = useVanta();

  return (
    <div className={styles.Home}>
      <Head>
        <title>Tural Hajiyev</title>
        <link rel="icon" href="/rocket.png" />
      </Head>
      <main className={styles.main} ref={vantaRef}>
        <div className={styles.Profile}>
          <Image
            src={ProfilePhoto}
            alt="pp"
            className={styles.pp}
            width={200}
            height={200}
          />
          <span className={styles.header}>
            <span className={styles.greetings}>Witam! I&apos;m</span> 
            <span className={styles.fullName}>Tural Hajiyev.</span>
          </span>
          <div className={styles.description}>
            <Link
              target="_blank"
              href="https://frontendmasters.com/guides/front-end-handbook/2018/what-is-a-FD.html"
            >
              <div className={styles.title}>Frontend Developer</div>
            </Link>

            <div className={styles.links}>
              {/* <Link href="/blog"> */}
                <div className={`${styles.link} ${styles.blog}`}>Blog</div>
              {/* </Link> */}
              <Link href="/cv.pdf">
                <div className={`${styles.link} ${styles.cv}`}>CV</div>
              </Link>
            </div>
            <div className={styles.socials}>
              {socials.map(({ name, icon, link }) => (
                <Link href={link} target="_blank" key={name}>
                  {icon({
                    className: styles.social,
                    size: 40,
                  })}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
