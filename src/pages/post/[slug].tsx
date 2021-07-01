import { useEffect, useState } from 'react';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BsClock } from 'react-icons/bs';
import { initializeApollo } from '../../lib/apollo';
import { CREATE_COMMENT, GET_POST } from '../../lib/queries/post';
import { Post as IPost } from '../../lib/types';
import { useMutation } from '@apollo/client';
import { PuffLoader } from 'react-spinners';
import Template from '../../components/Template';
import Pagination from '../../components/Pagination';
import { IoWarningOutline } from 'react-icons/io5';

const commentPerPage = 3;

export default function Post({ post }: { post: IPost }) {
  const [authorName, setAuthorName] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState(post.comments);
  const [doComment, { loading }] = useMutation(CREATE_COMMENT);

  const [page, setPage] = useState(1);
  const totalComments = post.comments.length;
  const skip = (page - 1) * commentPerPage;
  const totalPages = Math.ceil(totalComments / commentPerPage);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await doComment({
        variables: {
          id: post.id,
          authorName,
          body,
          take: commentPerPage,
          skip: skip,
        },
      });
      setAuthorName('');
      setBody('');
      setComments(response.data.createComment.post.comments);
    } catch (error) {
      console.log('catch err ⚠️', error.message);
    }
  };

  useEffect(() => {
    const apollo = initializeApollo();
    apollo
      .query({
        query: GET_POST,
        variables: {
          slug: post.slug,
          take: commentPerPage,
          skip: skip,
        },
      })
      .then((res) => setComments(res.data.findFirstPost.comments));
  }, [page]);

  return (
    <Template>
      <div className='w-full mx-auto'>
        <Head>
          <title>{post.title}</title>
        </Head>
        <article>
          <div className='mb-8 space-y-4 text-center sm:text-left'>
            <h1 className='text-2xl font-semibold text-black sm:text-4xl'>
              {post.title}
            </h1>
            <p>Post summary????</p>
            <div className='flex items-center justify-center space-x-2 sm:justify-start whitespace-nowrap'>
              <div className='flex items-center px-2 py-1 pl-2 space-x-1 bg-gray-200 rounded-lg'>
                <div className='w-4 h-4'>
                  <BsClock />
                </div>
                <div>{moment(post.createdAt).fromNow()}</div>
              </div>
            </div>
          </div>
          <div>{post.body}</div>
        </article>
        <hr className='my-4' />
        <div>
          <div>
            <h3 className='text-xl font-semibold'>Yorumlar</h3>
            {comments.length <= 0 ? (
              <div className='flex items-center p-2 my-6 bg-yellow-400 rounded'>
                <IoWarningOutline className='mr-1' size='24' /> hic yorum yok
              </div>
            ) : (
              <>
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
                <ul>
                  {comments.map((comment) => (
                    <li
                      className='flex flex-col justify-center border-b'
                      key={comment.id}
                    >
                      <div className='flex items-center'>
                        <h5 className='font-semibold'>{comment.authorName}</h5>
                        <span className='mx-1'>•</span>
                        <span className='text-sm text-gray-500'>
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <h3 className='mt-2 text-xl font-semibold'>Yorum yap</h3>
          <form className='space-y-4' onSubmit={onSubmit}>
            <div>
              <label className='block'>Ad</label>
              <input
                type='text'
                className='p-1 rounded-sm ring-1 ring-gray-400'
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              <label className='block'>
                Düşünceleriniz <span className='text-red-600'>*</span>
              </label>
              <textarea
                className='w-1/2 p-1 rounded-sm resize-none ring-1 ring-gray-400'
                rows={5}
                placeholder='düşüncelerinizi belirtebilirsiniz...'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            {!loading ? (
              <button className='px-4 py-1 text-white bg-blue-500 rounded ring-1'>
                Gönder
              </button>
            ) : (
              <PuffLoader />
            )}
          </form>
        </div>
      </div>
    </Template>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apollo = initializeApollo();
  const res = await apollo.query({
    query: GET_POST,
    variables: {
      slug: ctx.params.slug,
      /*     take: 3,
      skip: 0, */
    },
  });

  return {
    props: {
      post: res.data.findFirstPost,
    },
  };
};
