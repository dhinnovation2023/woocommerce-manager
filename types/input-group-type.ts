import { RemixiconComponentType } from "@remixicon/react";
import { ChangeEvent, InputHTMLAttributes } from "react";

export type InputGroupType = {
    label?: string,
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    icon?: RemixiconComponentType,
    name: string,
    invalid?: boolean,
    isPassword?: boolean,
    type?: InputHTMLAttributes<HTMLInputElement>["type"],
    required: boolean,
}