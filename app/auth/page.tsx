'use client';

import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Auth = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);
    const handleSignIn = async (provider: string) => {
        try {
            const result = await signIn(provider, { redirect: false });

            if (!result) {
                setError('Sign-in failed: no response');
                console.error("No result returned from signIn");
            } else if (result.error) {
                setError(result.error);
                console.error("Sign-in error:", result.error);
            }
        } catch (err) {
            setError('Sign-in request failed');
            console.error("Error during sign-in:", err);
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
};

export default Auth;
