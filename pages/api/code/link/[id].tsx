import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { prisma } from "lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session = await getServerSession(req, res, authOptions)

    const { id: codeId } = req.query


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

    if (req.method == 'GET') {
        console.log(`codeId ${codeId}`)
        let code = await prisma.qRCode.findUnique({
            where: {
                id: codeId as string
            }
        })

        console.log(code)

        let codeResources = await prisma.resourceCodes.findMany({
            where: {
                codeId: codeId as string
            }
        })

        console.log(codeResources)

        let resourceIds = codeResources.map((resource) => {
            return resource.resourceId
        })

        console.log(resourceIds)

        let resources = await prisma.resource.findMany({
            where: {
                id: {
                    in: resourceIds
                }
            }
        })

        res.status(200).send({
            'code': code,
            'resources': resources
        },)
    }
}