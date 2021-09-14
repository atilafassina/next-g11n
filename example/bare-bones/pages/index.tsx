import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useG11n } from 'next-g11n'
import styles from '../styles/root.module.css'
import { DICTIONARY } from '../dictionary'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const { translate: t } = useG11n<typeof DICTIONARY>(DICTIONARY, true)

  return (
    <div className={styles.container}>
      <Head>
        <title>next-g11n: bare bones</title>
        <meta name="description" content="next-g11n bare bones example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav>
          {locale === 'en' 
            ? <Link href="/" locale="gc"><a>Gaucho language</a></Link>
            : <Link href="/" locale="en"><a>English language</a></Link>
          }
        </nav>
        <h1 className={styles.title}>
          {t('hello')}
        </h1>
      </main>

      <footer className={styles.footer}>
        <Image src="/light-logo.png" alt="next-g11n logo" width="70" height="70" />
      </footer>
    </div>
  )
}

export default Home
