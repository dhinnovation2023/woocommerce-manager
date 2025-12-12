import mongoose from "mongoose";

export interface UsersModelInterface extends mongoose.Document {
    name: string,
    displayName: string,
    email: string,
    password: string,
}

const usersSchema = new mongoose.Schema<UsersModelInterface>({
    name: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UsersModel = mongoose.models.UsersModel || mongoose.model("UsersModel", usersSchema);
export default UsersModel;
