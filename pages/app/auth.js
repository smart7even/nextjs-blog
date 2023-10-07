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
        <div>
            <div>Hello World</div>
            <LoginBtn />
            {session?.user.image && <Avatar image={session.user.image} />}
            <Input placeholder="Enter post" />
        </div>
    )
} 