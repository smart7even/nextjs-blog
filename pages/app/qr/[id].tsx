import { useSession, signIn, signOut } from "next-auth/react"

import { Button, Input, QRCode } from 'antd'

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import LinksList from 'components/links';
import router, { useRouter } from 'next/router';
import LoginBtn from "components/login-btn";
import Avatar from "components/avatar";
import { ro } from "date-fns/locale";

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
    const [myResources, setMyResources] = useState<Resource[]>([])
    const { data: session } = useSession()
    const router = useRouter()
    const [newLinkContent, setNewLinkContent] = useState(''); // Declare a state variable...

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    async function onPageLoad() {
        let response = await fetch(`/api/code/${router.query.id}`, {
            method: "GET",
        })
        let json = await response.json()

        console.log(json)

        setCodeId(json.id)

        await getMyResources();
    }

    async function getMyResources() {
        if (session == null) {
            console.log('session is null')
            return
        }

        let response = await fetch('/api/link', {
            method: "GET",
        })
        let json = await response.json()

        console.log(json)
        setMyResources((prev) => json.resources)
    }

    async function onPageUpdate(codeId: string) {
        if (!codeId || codeId == '') {
            console.log('code id is null')
            return
        }

        let response = await fetch(`/api/code/${codeId}`)

        let json = await response.json()

        console.log(json)

        setResources((prev) => json.resources.map((r) => r.resource))

        // if (json.resources.length > 0) {
        //     let link = json.resources[0].resource.content

        //     console.log(link)

        //     if (!link.startsWith('http://') && !link.startsWith('https://')) {
        //         link = 'http://' + link
        //     }

        //     location.replace(link);
        // }
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

    async function onSelect(resourceId: string) {
        console.log("Selecting code")

        await fetch('/api/code/link', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": resourceId,
                "codeId": router.query.id
            })
        })

        setSelectedItems((prev) => [...prev, resourceId])
    }

    async function onPostSend() {
        if (!session) {
            await onUnauthorizedPostSend()
            return
        }

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

    async function onUnauthorizedPostSend() {
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

        const json = await response.json()

        const resourceId = json.id

        // link is created, now we need to attach it to the code
        const attachLinkResponse = await fetch('/api/code/link', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": resourceId,
                "codeId": router.query.id
            })
        })

        await onPageLoad()
        setNewLinkContent('')
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

    let link = `${props.url}/app/qr/${codeId}`

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
                codeId && <div>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={link}
                    // viewBox={`0 0 256 256`}
                    />
                    <div className='mt-2 break-all'>
                        <a href={link} target="_blank">{link}</a>
                    </div>
                    <div className='flex mt-2'>
                        <Input className='mr-2' value={newLinkContent} placeholder="Enter link" onPressEnter={onPostSend} onChange={e => setNewLinkContent(e.target.value)} />
                        <Button onClick={onPostSend}>Post</Button>
                    </div>
                    <LinksList title='Attached Links' resources={resources} onDelete={null} onSelect={null} />
                    {session && <LinksList title='My Links' resources={myResources} onDelete={onDelete} onSelect={onSelect} selectedItems={selectedItems} />}
                </div>
            }

        </div>
    )
} 