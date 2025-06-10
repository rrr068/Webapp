'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.passwordConfirmation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      localStorage.setItem('access-token', res.headers['access-token'])
      localStorage.setItem('client', res.headers['client'])
      localStorage.setItem('uid', res.headers['uid'])

      router.push('/user/dashboard')
    } catch (err: any) {
      console.error(err)
      setError('登録に失敗しました')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">ユーザー登録</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="名前"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="パスワード確認"
          value={form.passwordConfirmation}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          登録
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}

export default SignUp