import LoginBtn from '../../components/login-btn.jsx'
import Avatar from '../../components/avatar';

import { useSession } from "next-auth/react"

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useRouter } from 'next/navigation';

export async function getServerSideProps({ req, res }) {
    return {
        props: {
            session: await getServerSession(req, res, authOptions),
            url: process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
        }
    }
}

export default function QrPage(props) {
    const { data: session } = useSession()
    const router = useRouter()

    async function onPageLoad() {
        let response = await fetch('/api/code', {
            method: "POST",
        })
        let json = await response.json()

        console.log(json)

        let codeId = json.id

        if (codeId != null) {
            router.push(`/app/qr/${codeId}`);
        }
    }

    useEffect(() => {
        onPageLoad()
    }, []);

    return (
        <div className='m-2'>
            <div className='flex items-center justify-between mb-2'>
                <LoginBtn />
                <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                    {session?.user.image && <Avatar image={session.user.image} size={32} />}
                    {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                </div>
            </div>
        </div>
    )
} 