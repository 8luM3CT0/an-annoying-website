import { getSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/feed/Feed'
import Header from '../components/header/Header'
import Login from '../components/login/Login'
import Sidebar from '../components/sidebar/Sidebar'
import Widgets from '../components/widgets/Widgets'
import { db } from '../firebase'
export default function Home ({ session, posts }) {
  if (!session) return <Login />
  return (
    <div className='h-screen overflow-hidden bg-gray-100'>
      <Head>
        <title>Social-network</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/**Header */}
      <Header />
      <main className='flex'>
        {/**Sidebar */}
        <Sidebar />
        {/** Feed*/}
        <Feed posts={posts} />
        {/**Widget */}
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  //get the user
  const session = await getSession(context)

  const posts = await db
    .collection('posts')
    .orderBy('timestamp', 'desc')
    .get()

  const docs = posts.docs.map(post => ({
    id: post.id,
    ...post.data(),
    timestamp: null
  }))

  return {
    props: {
      session,
      posts: docs
    }
  }
}
