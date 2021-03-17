import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { IoWarningOutline } from 'react-icons/io5';
import PostCard from '../../components/PostCard';
import Template from '../../components/Template';
import { initializeApollo } from '../../lib/apollo';
import { GET_CATEGORY } from '../../lib/queries/category';
import { GET_POSTS_BY_SLUG } from '../../lib/queries/post';
import { Category, Post } from '../../lib/types';

interface Props {
  data: { posts: Post[] };
  categoryData: { findFirstCategory: Category };
}

export default function CategoryPage({ data, categoryData }: Props) {
  return (
    <Template>
      <Head>
        <title>{categoryData.findFirstCategory.title} kategorisi</title>
      </Head>
      <main className='container py-4 mx-auto'>
        <div className='flex justify-center'>
          <img
            src='https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            alt='gogle'
            className='w-40'
          />
        </div>
        <h4 className='text-lg font-semibold text-gray-800'>
          {categoryData.findFirstCategory.title} Son Yazıları
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          impedit est fugit dicta beatae
        </p>
        {data.posts.length <= 0 ? (
          <div className='flex items-center p-2 my-6 bg-yellow-400 rounded'>
            <IoWarningOutline className='mr-1' size='24' /> hic post yok
          </div>
        ) : (
          <div className='grid gap-4 mt-6 md:grid-cols-2'>
            {data.posts.map((post: Post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        )}
      </main>
    </Template>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: GET_POSTS_BY_SLUG,
    variables: { slug: ctx.params.slug },
  });
  const categoryRes = await apolloClient.query({
    query: GET_CATEGORY,
    variables: { slug: ctx.params.slug },
  });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      data: res.data,
      categoryData: categoryRes.data,
    },
  };
};
