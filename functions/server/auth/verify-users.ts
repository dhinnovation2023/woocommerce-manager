import { dbConnect } from "@/config/database";
import { compareHashValue } from "@/functions/bcrypt";
import UsersModel, { UsersModelInterface } from "@/models/users";
import { User } from "next-auth";

export async function verifyUsers(data: {
    email: string,
    password: string,
}) {
    return new Promise<User | null>(async resolve => {
        try {
            await dbConnect();
            const userExist = await UsersModel.findOne({ email: data.email }) as UsersModelInterface;
            if (userExist) {
                const isPasswordMatching = await compareHashValue(data.password, userExist.password);
                if (isPasswordMatching) {
                    return resolve({
                        id: userExist._id.toString(),
                        email: userExist.email,
                        name: userExist.displayName,
                    })
                } else {
                    return resolve(null);
                }
            } else {
                return resolve(null);
            }
        } catch (err) {
            console.error(err);
            return resolve(null);
        }
    })
}