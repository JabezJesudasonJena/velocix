import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class UserMidd {
    static userValidity = catchAsync(async(req, res, next) => {
        const user = await prisma.user.findFirst({
            where: {id: req.user.id}
        })
        if(!user) throw new AppError("Invalid User", 404);
        next();
    })
}

export default UserMidd;

