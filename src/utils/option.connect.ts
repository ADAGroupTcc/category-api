import { MongooseModuleOptions } from "@nestjs/mongoose"
import { ServerApiVersion } from "mongodb"

export const localDbOptions: MongooseModuleOptions = {
  retryAttempts: Number(process.env.RETRY_ATTEMPTS),
  retryDelay: Number(process.env.RETRY_DELAY),
}
export const serverDbOptions: MongooseModuleOptions = {
  auth: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
  }
}