import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: codeId } = req.query

    if (!codeId) {
        res.status(400).send('code id is undefined')
        return
    }

    if (req.method == 'GET') {
        // Include links
        let code = await prisma.qRCode.findUnique({
            where: {
                id: codeId as string
            },
            include: {
                resources: {
                    include: {
                        resource: true
                    }
                }
            }
        })

        console.log(code)

        res.status(200).send(code)

        return
    }

    res.status(403).end()
}