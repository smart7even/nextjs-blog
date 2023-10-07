import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from 'antd';

export default function Component() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <Button type="primary" onClick={() => signOut()}>Sign out</Button>
            </>
        )
    }
    return (
        <>
            <Button type="primary" onClick={() => signIn()}>Sign in</Button>
        </>
    )
}