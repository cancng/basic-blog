import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface Props {
  page: number;
  setPage: any;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className='flex justify-center mt-4'>
      <nav
        className='relative z-0 inline-flex -space-x-px'
        aria-label='Pagination'
      >
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(1);
          }}
          className='relative inline-flex items-center px-4 py-2 focus:outline-none'
        >
          <BsArrowLeft />
        </button>
        <button
          disabled={page === 1}
          className='relative inline-flex items-center px-4 py-2 focus:outline-none'
          onClick={() => {
            setPage(page - 1);
          }}
        >
          geri
        </button>
        <span className='relative inline-flex items-center px-4 py-2'>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
          }}
          className='relative inline-flex items-center px-4 py-2 text-default-200 focus:outline-none'
        >
          ileri
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(totalPages);
          }}
          className='relative inline-flex items-center px-4 py-2 text-default-400 focus:outline-none'
        >
          <BsArrowRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
