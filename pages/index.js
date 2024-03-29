import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import mainStyles from '../styles/main.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  let router = useRouter();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Software engineer, donut lover, SPbSEU student</p>
        {/* <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p> */}
      </section>
      <h2 className={utilStyles.headingLg}>Contacts</h2>
      <div className={mainStyles.contacts}>
        <a
          href="https://t.me/aleckprogrammer"
          target="_blank"
        >
          <img
            height={48}
            width={48}
            src="/icons/telegram.svg"
            className={`${utilStyles.telegramIcon}`}
            alt="Telegram"
          />
        </a>
        <a
          href="https://github.com/smart7even"
          target="_blank"
        >
          <img
            height={48}
            width={48}
            src="/icons/github.svg"
            className={`${utilStyles.telegramIcon}`}
            alt="Github"
          />
        </a>
        <a
          href="https://linkedin.com/in/olegmagomedov"
          target="_blank"
        >
          <img
            height={48}
            width={48}
            src="/icons/linkedin.svg"
            className={`${utilStyles.telegramIcon}`}
            alt="Linkedin"
          />
        </a>
      </div>



      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <Button onClick={() => router.push("/app")}>Go to App</Button>
    </Layout>
  );
}