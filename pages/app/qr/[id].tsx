import { Input } from 'antd'
import Avatar from 'components/avatar'
import LinksList from 'components/links'
import LoginBtn from 'components/login-btn'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { useEffect, useState } from 'react'

export async function getServerSideProps({ req, res }) {
    return {
        props: {
            session: await getServerSession(req, res, authOptions)
        }
    }
}

export default function CodeIdPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [resources, setResources] = useState<Resource[]>([])
    const [linkedResources, setLinkedResources] = useState<Resource[]>([])

    const [newLinkContent, setNewLinkContent] = useState(''); // Declare a state variable...

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    async function onPageLoad() {
        if (session == null) {
            console.log('session is null')
            return
        }

        let linkedResponse = await fetch(`/api/code/link/${router.query.id}`, {
            method: "GET",
        })
        let linkedJson = await linkedResponse.json()

        console.log(linkedJson)
        setLinkedResources((prev) => linkedJson.resources)

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
        await fetch('/api/link', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": newLinkContent
            })
        })

        await onPageLoad()
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

    return (
        <div className='m-2'>
            <div className='flex items-center justify-between mb-2'>
                <LoginBtn />
                <div className='flex items-center justify-end p-1 hover:cursor-pointer hover:bg-ablue hover:text-white rounded'>
                    {session?.user.image && <Avatar image={session.user.image} size={32} />}
                    {session?.user.name && <div className='ml-2 text-sm'>{session.user.name}</div>}
                </div>
            </div>

            <p>Code id: {router.query.id}</p>

            <Input value={newLinkContent} placeholder="Enter link" onPressEnter={onPostSend} onChange={e => setNewLinkContent(e.target.value)} />
            <LinksList resources={linkedResources} onDelete={onDelete} onSelect={onSelect} selectedItems={selectedItems} />
            <LinksList resources={resources} onDelete={onDelete} onSelect={onSelect} selectedItems={selectedItems} />
        </div>
    )

}