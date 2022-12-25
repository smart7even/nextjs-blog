import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Script from 'next/script'

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="roadmapik_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></Script>
            <section className={utilStyles.headingMd}>
                <p>Software engineer, donut lover, SPbSEU student</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
        </Layout>
    );
}