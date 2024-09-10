'use client';

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase"; // Ensure this path is correct

const Verify = () => {
    const [tok, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchName = async () => {
            if (!tok) return; // Exit if no token is set

            try {
                const { data: name, error: fetchError } = await supabase
                    .from('verification_table')
                    .select('user_id')
                    .eq('token', tok)
                    .single();

                if (fetchError) {
                    throw new Error(fetchError.message);
                }

                if (name) {
                    const { data: datas, error: userError } = await supabase
                        .from('user')
                        .select('username')
                        .eq('id', name.user_id)
                        .single();

                    if (userError) {
                        throw new Error(userError.message);
                    }

                    if (datas) {
                        setUsername('datasername');
                    }
                }
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchName();
    }, [tok]);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            setToken(token);
        }
    }, []);

    return (
        <>
            <div>Verify</div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <h1>{username}</h1>
            )}
        </>
    );
};

export default Verify;
