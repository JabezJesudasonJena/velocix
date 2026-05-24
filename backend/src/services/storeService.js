import prisma from "../db/prismadb.mjs"

export const createStore = async (data, tokenData) => {
    if(tokenData.role != 'store-admin') throw new Error("U must be store admin to create store")
    const prismaStore = await prisma.store.create({
        data : {
            name: data.name, 
            ownerId: tokenData.id
        }
    })
    if (!prismaStore) throw new Error("Store does not exist")
    return prismaStore;
}

export const getAllStoresService = async () => {
    try { 
        const allPrismaStores = await prisma.store.findMany();
        return allPrismaStores
    }catch(err){
        return err
    }
}