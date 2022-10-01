import Link from 'next/link';
import { socials } from '../utils';
import styles from '../styles/Me.module.css';

export default function Me() {
  return (
    <div className={styles.Me}>
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
      <Link href="/cv.pdf">
        <div className={styles.cv}>CV</div>
      </Link>
    </div>
  );
}
