import Link from 'next/link';

import styles from './styles.module.css';

export const Post = ({ fileName, data }) => {
  return (
    <div className={styles.Post}>
      <div className={styles.content}>
        <Link href={`/blog/${fileName}`}>
          <h1 className={styles.title}>{data.title}</h1>
        </Link>
        <div className={styles.details}>
          <h2 className={styles.date}>{data.date}</h2>
          <p className={styles.divider}>•</p>
          <div className={styles.tags}>
            {data.tags?.map(tag => (
              <div
                key="tag"
               className={styles.tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{data.description}</p>
      </div>
    </div>
  );
};
