import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GET_CATEGORIES } from '../lib/queries/category';
import { Category, Page } from '../lib/types';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apollo';
import { GET_PAGES } from '../lib/queries/page';

export default function Navbar() {
  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);
  const [showCategories, setShowCategories] = useState(false);

  const { data: pagesData } = useQuery<{ pages: Page[] }>(GET_PAGES);
  console.log('pagesdata 🐤', pagesData);

  return (
    <nav className='z-10 flex w-full py-2 bg-white shadow'>
      <div className='container flex justify-between w-full px-4 mx-auto sm:w-8/12'>
        <div className='flex space-x-4'>
          <Link href='/'>
            <a className='font-bold'>HOME</a>
          </Link>
          <div>
            <span
              className='p-1 rounded-md cursor-pointer select-none hover:bg-blue-200'
              onClick={() => setShowCategories((prev) => !prev)}
            >
              Kategoriler
              {showCategories ? (
                <IoIosArrowUp className='inline' />
              ) : (
                <IoIosArrowDown className='inline' />
              )}
            </span>
            {showCategories && (
              <div
                className='absolute flex-col p-2 bg-white rounded-md shadow-md ring-1 ring-gray-500'
                style={{ top: '40px' }}
              >
                {categoriesLoading ? (
                  <div className='flex'>
                    <PuffLoader size='24' />
                  </div>
                ) : (
                  categoriesData.categories.map((category) => (
                    <Link href={`/category/${category.slug}`} key={category.id}>
                      <a className='block hover:underline'>{category.title}</a>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className='space-x-4'>
          {pagesData &&
            pagesData.pages.map((page) => (
              <Link href={`/page/${page.slug}`} key={page.id}>
                <a>{page.title}</a>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}

/* export const getServerSideProps: GetServerSideProps = async () => {
  const apollo = initializeApollo();
  const res = await apollo.query({
    query: GET_PAGES,
  });
  // console.log(res.data);
  
  return {
    props: {
      pages: res,
    },
  };
}; */
