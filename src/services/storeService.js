import prisma from "../db/prismadb.mjs"

export const getStore = async (data) => {
    const prismaStore = await prisma.store.findMany({
        where : {
            name: data.name
        }
    })
    if (!prismaStore) throw new Error("There are no stores")
    return prismaStore;
}

export const createStore = async (data, tokenData) => {
    if(tokenData.role != 'storeadmin') throw new Error("U must be store admin to create store")
    const prismaStore = await prisma.store.create({
        data : {
            name: data.name, 
            ownerId: tokenData.id
        }
    })
    if (!prismaStore) throw new Error("Store does not exist")
    return prismaStore;
}