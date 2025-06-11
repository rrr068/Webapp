'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // トークン類を取得して保存
      const headers = response.headers;
      localStorage.setItem('access-token', headers['access-token']);
      localStorage.setItem('client', headers['client']);
      localStorage.setItem('uid', headers['uid']);

      router.push('/user/dashboard')
      setErrorMsg('');
    } catch (error: any) {
      setErrorMsg('ログインに失敗しました。');
      setSuccessMsg('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          ログイン
        </button>
      </form>
      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
    </div>
  );
};

export default Login;
