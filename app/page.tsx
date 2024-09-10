// components/SupabaseChecker.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SupabaseChecker = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('user')
          .select()
          .limit(1);

        if (error) throw error;

        if (data.length > 0) {
          setStatus('Supabase is connected and working!');
        } else {
          setStatus('Supabase is connected, but no data found.');
        }
      } catch (err: any) {
        setStatus('Failed to connect to Supabase.');
        setError(err.message);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Supabase Connection Status:</h1>
      <p className={`mt-2 ${error ? 'text-red-500' : 'text-green-500'}`}>
        {status}
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SupabaseChecker;
