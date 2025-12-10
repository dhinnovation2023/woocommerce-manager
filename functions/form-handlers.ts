import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function handleFormInputOnChangeDynamicData<TSchema>(data: {
    setFormData: Dispatch<SetStateAction<TSchema>>
    event?: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    noEvent?: {
        name: string,
        value: string,
    }
}) {

    let name, value;

    if (data.event) {
        name = data.event.target.name;
        value = data.event.target.value;
        if (!name) {
            throw new Error("Input > target > (name) is undefined");
        }
    } else if (data.noEvent) {
        name = data.noEvent.name;
        value = data.noEvent.value;
    } else {
        throw new Error("Please provide event or noEvent for handleFormInputOnChange function.");
    }

    data.setFormData(prev => ({
        ...prev,
        [name]: value,
    }))
}

export function handleFormInputDirectOnChange<TSchema>(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setFormData: Dispatch<SetStateAction<TSchema>>
) {
    handleFormInputOnChangeDynamicData({
        setFormData,
        event,
    })
}