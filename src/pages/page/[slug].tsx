import moment from 'moment';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BsClock } from 'react-icons/bs';
import parse from 'html-react-parser';
import Template from '../../components/Template';
import { initializeApollo } from '../../lib/apollo';
import { GET_PAGE } from '../../lib/queries/page';
import { Page as IPage } from '../../lib/types';

export default function Page({ page }: { page: IPage }) {
  return (
    <Template>
      <div className='w-full mx-auto'>
        <Head>
          <title>{page.title}</title>
        </Head>
        <article>
          <div className='mb-8 space-y-4 text-center sm:text-left'>
            <h1 className='text-2xl font-semibold text-black sm:text-4xl'>
              {page.title}
            </h1>
            <p>Post summary????</p>
            <div className='flex items-center justify-center space-x-2 sm:justify-start whitespace-nowrap'>
              <div className='flex items-center px-2 py-1 pl-2 space-x-1 bg-gray-200 rounded-lg'>
                <div className='w-4 h-4'>
                  <BsClock />
                </div>
                <div>{moment(page.createdAt).fromNow()}</div>
              </div>
            </div>
          </div>
          {parse(page.content)}
        </article>
      </div>
      {/* TODO: Styling is not working */}
      <style jsx>{`
        h1 {
          font-size: 2em;
          font-weight: bolder;
        }

        h2 {
          font-size: 1.5em;
          font-weight: bolder;
        }

        h3 {
          font-size: 1.17em;
          font-weight: bolder;
        }

        h4 {
          font-size: 1em;
          font-weight: bolder;
        }

        h5 {
          font-size: 0.83em;
          font-weight: bolder;
        }

        h6 {
          font-size: 0.67em;
          font-weight: bolder;
        }
      `}</style>
    </Template>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apollo = initializeApollo();
  const res = await apollo.query({
    query: GET_PAGE,
    variables: {
      slug: ctx.params.slug,
    },
  });

  return {
    props: {
      page: res.data.findFirstPage,
    },
  };
};
