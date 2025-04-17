import 'fastify'
import { DomainModels } from '../lib/domain-model'

//Extend the PassportUser interface as described in the Using with Typescript section of the fastify-passport documentation: https://github.com/fastify/fastify-passport
declare module 'fastify' {
  interface PassportUser extends DomainModels.User {}
}
