import type { InferGetStaticPropsType } from 'next'
import type { Locales, Keys} from '../dictionary'
import Head from 'next/head'
import Image from 'next/image'
import { ssrG11n, getLocale } from 'next-g11n'
import styles from '../styles/root.module.css'
import { DICTIONARY } from '../dictionary'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home = ({ hello }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const g11nLocale = getLocale(router) as Locales
  
  return (
    <div className={styles.container}>
      <Head>
        <title>next-g11n: server-side-rendered</title>
        <meta name="description" content="next-g11n server-side-rendered example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav>
          {router.locale === 'en' 
            ? <Link href="/" locale="gc"><a>Gaucho language</a></Link>
            : <Link href="/" locale="en"><a>English language</a></Link>
          }
        </nav>
        <h1 className={styles.title}>
          {hello[g11nLocale]}
        </h1>
      </main>

      <footer className={styles.footer}>
        <Image src="/light-logo.png" alt="next-g11n logo" width="70" height="70" />
      </footer>
    </div>
  )
}

export const getStaticProps = async () => ({
  props: {
    hello: ssrG11n<Keys, Locales>('hello', DICTIONARY),
  }
})

export default Home
