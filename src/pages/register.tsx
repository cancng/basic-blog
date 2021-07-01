import { useMutation } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Template from '../components/Template';
import { REGISTER_USER } from '../lib/queries/user';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser({ variables: { username, password } });
      router.push('/');
    } catch (error) {
      console.log('catch err ⚠️', error.message);
    }
  };
  return (
    <Template>
      <div className='w-full mx-auto'>
        <Head>
          <title>Kayıt ol</title>
        </Head>
        <h3 className='pb-4 text-4xl font-bold border-b-2'>Kayıt ol</h3>
        <form onSubmit={onSubmit} className='max-w-xs'>
          <div>
            <label className='block'>Kullanıcı adı</label>
            <input
              type='text'
              placeholder='username...'
              className='w-full px-1 border rounded-sm'
            />
          </div>
          <div>
            <label className='block'>Şifre</label>
            <input
              type='password'
              placeholder='password...'
              className='w-full px-1 border rounded-sm'
            />
          </div>
          <div className='my-4'>
            <button className='px-2 py-1 text-white bg-blue-600 rounded-sm'>Kaydet</button>
          </div>
        </form>
      </div>
    </Template>
  );
};

export default Register;
