import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { prisma } from "lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).send('authorize to make this request')
        return
    }

    console.log(session.user.id)

    let userId: string = session.user.id

    if (!userId) {
        res.status(401).send('user id is undefined')
        return
    }

    if (req.method == 'GET') {
        let resources = await prisma.resource.findMany({
            where: {
                userId: userId,
            }
        })
        console.log(resources)
        res.status(200).send({
            'resources': resources
        })
    } else if (req.method == 'POST') {
        let newResource = req.body
        console.log(newResource)
        let newResourceContent: string = newResource.content

        if (newResourceContent.length === 0) {
            res.status(400).send('resource content is empty')
            return
        }

        // let dbSession = prisma.session.findUnique({
        //     where: {
        //         id: session
        //     }
        // })

        await prisma.resource.create({
            data: {
                userId: userId,
                type: 'link',
                content: newResourceContent
            }
        })

        res.status(200).send(null)

        return
    } else if (req.method == 'DELETE') {
        let resourceId: string = req.body.id

        console.log(resourceId)

        if (!resourceId) {
            res.status(400).send('resource id is empty')
        }

        // update resource set user id nullable
        await prisma.resource.update({
            where: {
                id: resourceId
            },
            data: {
                userId: null
            }
        })

        res.status(200).send(null)

        return
    }
}