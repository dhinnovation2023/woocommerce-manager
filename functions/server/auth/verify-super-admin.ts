import { User } from "next-auth";

export async function verifySuperAdmin(data: {
    email: string,
    password: string,
}) {
    return new Promise<User | null>(resolve => {
        try {

            const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
            const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

            if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
                throw new Error("Please provide SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in .env")
            }

            if (SUPER_ADMIN_EMAIL === data.email) {

                if (SUPER_ADMIN_PASSWORD === data.password) {

                    const SUPER_ADMIN_USER_OBJECT: User = {
                        id: "$2y$10$Cm4doNNTEUaBKuYuILYX7ODWLtR0vKPStVN6aEyMUhBbkllNUtWj2",
                        email: SUPER_ADMIN_EMAIL,
                        name: "Super Admin",
                    }

                    return resolve(SUPER_ADMIN_USER_OBJECT);

                }

            } else {
                return resolve(null);
            }

        } catch (err) {
            return resolve(null);
        }
    })
}