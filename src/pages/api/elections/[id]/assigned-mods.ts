import { handleAuthedEndpoint } from 'universe/backend/middleware'

import type { NextApiResponse } from 'next'
import type { NextSessionRequest } from 'multiverse/simple-auth-session'

export default async function(req: NextSessionRequest, res: NextApiResponse): void {
    await handleAuthedEndpoint(async () => {
        const { id: electionId } = req.query;

        if(req.method == 'GET') {
            // TODO: pull from remote API instead
            res.status(200).send([3]);
        }

        else if(req.method == 'POST') {
            // TODO: interact with remote API instead
            res.status(200).send({ success: true });
        }

        else if(req.method == 'DELETE') {
            // TODO: interact with remote API instead
            res.status(200).send({ success: true });
        }
    }, { req, res, methods: ['GET', 'POST', 'DELETE'] });
}