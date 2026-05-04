import prisma from "../db/prismadb.mjs"

export const createStore = async (data) => {
    const prismaStore = await prisma.store.create({ data : {
        name: data.name,
        ownerId: data.ownerId,
    } });
    if (!prismaStore) throw new Error("Store does not exist")
    return prismaStore;
}

export const getStore = async (data) => {
    const prismaStore = await prisma.store.findMany({
        where : {
            name: data.name
        }
    })
    if (!prismaStore) throw new Error("There are no stores")
    return prismaStore;
}

export const createProtectStore = async (data, role) => {
    if (role == 'storeadmin') throw new Error("user is not a store admin");
    const prismaStore = await prisma.store.create({
        data : {
            name: data.name, 
            userId: data.userId
        }
    })
    if (!prismaStore) throw new Error("Store does not exist")
    return prismaStore;
}