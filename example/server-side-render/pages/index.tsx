import type { InferGetStaticPropsType } from 'next'
import type { Locales, Keys} from '../dictionary'
import Head from 'next/head'
import Image from 'next/image'
import { createStaticTerm, getLocale, createFunctionTerm, clientSideTranslate } from 'next-g11n'
import styles from '../styles/root.module.css'
import { DICTIONARY } from '../dictionary'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home = ({ hello, rawBye }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const g11nLocale = getLocale(router) as Locales
  const bye = clientSideTranslate<Locales, 'person'>(rawBye)

  return (
    <div className={styles.container}>
      <Head>
        <title>next-g11n: server-åside-rendered</title>
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
        <h2>
          {bye[g11nLocale]({ person: 'Rick'})}
        </h2>
      </main>

      <footer className={styles.footer}>
        <Image src="/light-logo.png" alt="next-g11n logo" width="70" height="70" />
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const hello = createStaticTerm<Keys, Locales>('hello', DICTIONARY)
  const rawBye = createFunctionTerm('bye', DICTIONARY)

  return { 
    props: {
      hello,
      rawBye
    }
  }
}

export default Home
