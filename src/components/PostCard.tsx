import Link from 'next/link';
import { Post } from '../lib/types';
import { FiHash } from 'react-icons/fi';
import moment from 'moment';
import { BsClock } from 'react-icons/bs';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className='p-4 bg-gray-100 rounded ring-1 hover:shadow-lg ring-gray-200'>
      <div className='flex items-center space-x-3'>
        <Link href={`/post/${post.slug}`}>
          <a className='w-2/6'>
            <div
              className='h-24 rounded-md'
              style={{
                background: `url(${process.env.NEXT_PUBLIC_IMAGES}/${
                  post.thumbnail ? post.thumbnail : 'empty.png'
                }) center / cover`,
              }}
            ></div>
          </a>
        </Link>
        <div className='w-4/6'>
          <Link href={`/post/${post.slug}`}>
            <a className='hover:underline'>
              <h2 className='font-semibold truncate'>{post.title}</h2>
            </a>
          </Link>
          <p className='text-gray-800 line-clamp-3'>
            Bu site ne? Neden yeni bir site yapıyorum? Sitemin geleceği için ne
            gibi kararlar alacağım? Hepsini bu yazıda açıklıyorum!
          </p>
        </div>
      </div>
      <div className='flex items-center mt-2 space-x-4 text-gray-700 justify-self-end'>
        <div className='flex items-center space-x-1'>
          <FiHash /> <span>{post.category.title}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <BsClock />
          <span>{moment(post.createdAt).format('DD/MM/YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
