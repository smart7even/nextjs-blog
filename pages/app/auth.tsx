import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import LoginBtn from '../../components/login-btn.jsx'
import Avatar from '../../components/avatar';

import { useSession, signIn, signOut } from "next-auth/react"

import { Input } from 'antd'

export default function AuthPage(props) {
    const { data: session } = useSession()

    return (
        <div className='m-2'>
            <div className='flex items-center justify-between mb-2'>
                <LoginBtn />
                <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                    {session?.user.image && <Avatar image={session.user.image} size={32} />}
                    {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                </div>
            </div>

            <Input placeholder="Enter post" />
        </div>
    )
} 