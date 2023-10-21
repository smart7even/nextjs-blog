import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import LoginBtn from '../../components/login-btn.jsx'
import Avatar from '../../components/avatar';

import { useSession, signIn, signOut } from "next-auth/react"

import { Button, Input, QRCode } from 'antd'

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { DeleteOutlined } from '@ant-design/icons';
import LinksList from 'components/links';
import { set } from 'date-fns';

export async function getServerSideProps({ req, res }) {
    return {
        props: {
            session: await getServerSession(req, res, authOptions),
            url: process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
        }
    }
}

export default function QrPage(props) {
    const [codeId, setCodeId] = useState<string>('')
    const [resources, setResources] = useState<Resource[]>([])
    const { data: session } = useSession()

    async function onPageLoad() {
        let response = await fetch('/api/code', {
            method: "POST",
        })
        let json = await response.json()

        console.log(json)

        setCodeId(json.id)
    }

    async function onPageUpdate(codeId: string) {
        if (!codeId || codeId == '') {
            console.log('code id is null')
            return
        }

        let response = await fetch(`/api/code/${codeId}`)

        let json = await response.json()

        console.log(json)

        setResources((prev) => json.resources)

        if (json.resources.length > 0) {
            let link = json.resources[0].resource.content

            console.log(link)

            if (!link.startsWith('http://') && !link.startsWith('https://')) {
                link = 'http://' + link
            }

            location.replace(link);
        }
    }

    useEffect(() => {
        onPageLoad()
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Refreshing")
            onPageUpdate(codeId)
        }, 1000)

        return () => clearInterval(interval)
    }, [codeId])

    return (
        <div className='m-2'>
            <div className='flex items-center justify-between mb-2'>
                <LoginBtn />
                <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                    {session?.user.image && <Avatar image={session.user.image} size={32} />}
                    {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                </div>
            </div>

            {
                codeId && <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={`${props.url}/app/qr/${codeId}`}
                // viewBox={`0 0 256 256`}
                />
            }

        </div>
    )
} 