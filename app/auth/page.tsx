'use client'
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Auth = () => {
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    const handleSignIn = async (provider: string) => {
        const result = await signIn(provider, { redirect: false });

        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}

            {session ? (
                <>
                    <p>Welcome, {session.user?.name}!</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            ) : (
                <>
                    <button onClick={() => handleSignIn('google')}>Sign in with Google</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
        </div>
    );
}

export default Auth;
