import LoginBtn from '../../components/login-btn.jsx'
import Avatar from '../../components/avatar';

import { useSession } from "next-auth/react"

import { Button, Divider, Dropdown, Input, MenuProps, Space } from 'antd'

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import LinksList from 'components/links';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
import useToken from 'antd/lib/theme/useToken.js';

export async function getServerSideProps({ req, res }) {
    return {
        props: {
            session: await getServerSession(req, res, authOptions)
        }
    }
}

export default function AuthPage(props) {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="/">
                    Main page
                </a>
            ),
        },
        // {
        //     key: '2',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        //             2nd menu item (disabled)
        //         </a>
        //     ),
        //     icon: <SmileOutlined />,
        //     disabled: true,
        // },
        // {
        //     key: '3',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //             3rd menu item (disabled)
        //         </a>
        //     ),
        //     disabled: true,
        // },
        // {
        //     key: '4',
        //     danger: true,
        //     label: 'a danger item',
        // },
    ];

    const [theme, token] = useToken();


    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };

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

        if (!session) {
            return
        }

        await onAuthorizedPostSend();
    }

    async function onAuthorizedPostSend() {
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
                <div></div>
                {session ? <Dropdown menu={{ items }}
                    dropdownRender={(menu) => (
                        <div style={contentStyle}>
                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                            <Divider style={{ margin: 0 }} />
                            <Space style={{ padding: 8 }}>
                                <LoginBtn></LoginBtn>
                            </Space>
                        </div>
                    )}
                >
                    <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                        {session?.user.image && <Avatar image={session.user.image} size={32} />}
                        {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                    </div>
                </Dropdown> : <LoginBtn />}

            </div>

            <div className='flex'>
                <Input className='mr-2' value={newLinkContent} placeholder="Enter link" onPressEnter={onPostSend} onChange={e => setNewLinkContent(e.target.value)} />
                <Button onClick={onPostSend}>Post</Button>
            </div>
            <LinksList resources={resources} onDelete={onDelete} title='My Links' />
        </div>
    )
} 