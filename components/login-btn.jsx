import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from 'antd';

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <Button type="primary" onClick={() => signOut()}>Sign out</Button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <Button type="primary" onClick={() => signIn()}>Sign in</Button>
        </>
    )
}