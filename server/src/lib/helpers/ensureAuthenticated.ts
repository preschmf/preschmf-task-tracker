import type { FastifyRequest, FastifyReply } from 'fastify'

const ensureAuthenticated = async (req: FastifyRequest, res: FastifyReply) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).send({ success: false, message: 'Unauthorized' })
  }
}

export default ensureAuthenticated
