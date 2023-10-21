import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import LoginBtn from '../../components/login-btn.jsx'
import Avatar from '../../components/avatar';

import { useSession, signIn, signOut } from "next-auth/react"

import { Button, Input } from 'antd'

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { DeleteOutlined } from '@ant-design/icons';
import LinksList from 'components/links';

export async function getServerSideProps({ req, res }) {
    return {
        props: {
            session: await getServerSession(req, res, authOptions)
        }
    }
}

export default function AuthPage(props) {
    const [resources, setResources] = useState<Resource[]>([])
    const { data: session } = useSession()

    const [newLinkContent, setNewLinkContent] = useState(''); // Declare a state variable...

    async function onPageLoad() {
        if (session == null) {
            console.log('session is null')
            return
        }

        let response = await fetch('/api/link', {
            method: "GET",
        })
        let json = await response.json()

        console.log(json)
        setResources((prev) => json.resources)
    }

    useEffect(() => {
        onPageLoad()
    }, []);

    async function onPostSend() {
        console.log("Sending request")
        const response = await fetch('/api/link', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": newLinkContent
            })
        })

        if (response.status != 200) {
            console.log("Error")
            return
        }

        await onPageLoad()
        setNewLinkContent('')
    }

    async function onDelete(resourceId: string) {
        console.log("Sending request")
        await fetch('/api/link', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": resourceId
            })
        })

        await onPageLoad()
    }

    return (
        <div className='m-2'>
            <div className='flex items-center justify-between mb-2'>
                <LoginBtn />
                <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                    {session?.user.image && <Avatar image={session.user.image} size={32} />}
                    {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                </div>
            </div>

            <div className='flex'>
                <Input className='mr-2' value={newLinkContent} placeholder="Enter link" onPressEnter={onPostSend} onChange={e => setNewLinkContent(e.target.value)} />
                <Button onClick={onPostSend}>Post</Button>
            </div>
            <LinksList resources={resources} onDelete={onDelete} title='My Links' />
        </div>
    )
} 