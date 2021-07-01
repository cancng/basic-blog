import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { IoWarningOutline } from 'react-icons/io5';
import PostCard from '../components/PostCard';
import Template from '../components/Template';
import { initializeApollo } from '../lib/apollo';
import { GET_POSTS } from '../lib/queries/post';
import { Post } from '../lib/types';

export default function Home({ data }: { data: { posts: Post[] } }) {
  return (
    <Template>
      <Head>
        <title>Blog Anasayfa</title>
      </Head>
      <main className='container py-4 mx-auto'>
        <div className='flex justify-center'>
          <img
            src='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            alt='gogle'
            className='w-40'
          />
        </div>
        <h4 className='text-lg font-semibold text-gray-800'>Son Yazılar</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          impedit est fugit dicta beatae
        </p>
        <div className='grid gap-4 mt-6 md:grid-cols-2'>
          {data.posts.length > 0 ? (
            data.posts.map((post) => <PostCard post={post} key={post.id} />)
          ) : (
            <div className='flex items-center col-span-2 p-2 my-6 bg-yellow-400 rounded'>
              <IoWarningOutline className='mr-1' size='24' /> hic yazi yok
            </div>
          )}
        </div>
      </main>
    </Template>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: GET_POSTS,
  });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      data: res.data,
    },
  };
};
