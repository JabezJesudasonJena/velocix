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
    if (data.ownerId != tokenData.id) throw new Error("only the owner of the store can create store")
    const prismaStore = await prisma.store.create({
        data : {
            name: data.name, 
            ownerId: data.ownerId
        }
    })
    if (!prismaStore) throw new Error("Store does not exist")
    return prismaStore;
}