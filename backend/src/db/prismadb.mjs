import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
 
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is missing");
}
 
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
 
export default prisma;