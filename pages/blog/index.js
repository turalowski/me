import { useState } from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from '../../components';
import styles from '../../styles/Blog.module.css';

export default function Blog({ posts }) {
  return (
    <div className={styles.main}>
      <div className={styles.Blog}>
        {posts.map(({ fileName, data }) => (
          <Post data={data} key={fileName} fileName={fileName} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get all post files from /posts folder
  const directories = fs.readdirSync('posts');
  const posts = directories.map(directoryName => {
    const files = fs.readdirSync(`posts/${directoryName}`);
    const post = files[0].replace('.md', '');
    const readFile = fs.readFileSync(
      `posts/${directoryName}/index.md`,
      'utf-8'
    );
    const { data } = matter(readFile);

    return {
      fileName: directoryName,
      data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
