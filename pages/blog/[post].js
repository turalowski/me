import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import mdVideo from 'markdown-it-video';
import styles from '../../styles/Post.module.css';

export default function Post({ data, content }) {
  return (
    <div className={styles.main}>
      <div className={styles.Post}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.details}>
          <h2 className={styles.date}>{data.date}</h2>
          <p className={styles.divider}>•</p>
          <div className={styles.tags}>
            {data.tags?.map(tag => (
              <div key="tag" className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <article
          className="prose prose-2xl dark:prose-invert"
          style={{ fontSize: '1.8rem' }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: md({
                html: true,
                linkify: true,
                typography: true,
              })
                .use(mdVideo)
                .render(content),
            }}
          />
        </article>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map(fileName => ({
    params: {
      post: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { post } }) {
  const file = fs.readFileSync(`posts/${post}/index.md`, 'utf-8');
  const { data, content } = matter(file);
  return {
    props: {
      data,
      content,
    },
  };
}
