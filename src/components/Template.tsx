import Navbar from './Navbar';

const Template: React.FC = ({ children }) => {
  return (
    <div className='min-h-screen mb-12 bg-gray-50 font-body'>
      <Navbar />
      <div className='container px-4 pt-6 mx-auto sm:w-8/12'>{children}</div>
    </div>
  );
};

export default Template;
