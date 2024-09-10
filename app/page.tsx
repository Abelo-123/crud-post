'use client';

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        // Handle successful registration (e.g., redirect or show a success message)
      } else {
        console.error('Error:', result.result);
        // Handle registration error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Client Error:', error.message);
      // Handle client-side error
    }
  };


  return (
    <div className="w-screen h-screen bg-red-100 flex flex-wrap flex-col place-content-center">
      <h1 className="font-mono text-2xl">Create Account</h1>
      <div className="p-4 w-fit flex-col flex  gap-2 bg-red-200">
        <button className="px-12 py-4 bg-blue-200">Google</button>
        <button className="px-12 py-4 bg-blue-200">Github</button>
      </div>
      <div className="p-2 w-fit bg-red-200">
        <div className="p-2 w-fit flex-col flex  gap-2 bg-red-200">
          <h2 className="text-center">With Email</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-2 py-2 bg-blue-200"
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-2 bg-blue-200"
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-2 bg-blue-200"
            />
            <button type="submit" className="px-2 py-4 bg-red-200">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
