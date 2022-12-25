import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Script from 'next/script'
import { useRouter } from 'next/router'


export default function Home() {
    const router = useRouter()
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = router.query

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Software engineer, donut lover, SPbSEU student</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
                <p>You are logged in as {first_name} {last_name}</p>
            </section>
        </Layout>
    );
}