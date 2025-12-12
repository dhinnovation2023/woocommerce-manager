"use server";

import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export async function generateHashValue (data: string) {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hashValue = bcrypt.hash(data, salt);
    return hashValue;
}

export async function compareHashValue (data: string, hashValue: string) {
    const matching = await bcrypt.compare(data, hashValue);
    return matching;
}