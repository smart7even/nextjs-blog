import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session = await getServerSession(req, res, authOptions)

    // if (!session) {
    //     res.status(401).send('authorize to make this request')
    //     return
    // }

    console.log(session?.user.id)

    let userId: string = session?.user.id

    // if (!userId) {
    //     res.status(401).send('user id is undefined')
    //     return
    // }

    if (req.method == 'POST') {
        let newCode = await prisma.qRCode.create({
            data: {

            }
        })

        console.log(newCode)

        res.status(200).send(newCode)

        return
    }

    res.status(200).send({
        'session': session
    })
}