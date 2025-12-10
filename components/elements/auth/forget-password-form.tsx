'use client';

import { InputGroupType } from '@/types/input-group-type';
import BasicForm from '../ui/basic-form';
import { useEffect, useState } from 'react';
import { RiAtLine } from '@remixicon/react';

const ForgetPasswordForm = () => {

    const [email, setEmail] = useState<string>('Hello');

    const [fieldsData, setFieldsData] = useState<InputGroupType[]>([
        {
            name: "email",
            onChange: (event) => setEmail(event.target.value),
            value: email,
            icon: RiAtLine,
            invalid: false,
            placeholder: "Account email address",
            type: "email",
            required: true,
        }
    ])

    useEffect(() => {
        setFieldsData(prev => {
            const update: InputGroupType[] = prev.map((item) => {
                return ({
                    ...item,
                    value: email,
                })
            })

            return update;
        })
    }, [email])

    return (
        <div
            className='space-y-7'
        >
            <div>
                <h2
                    className='text-lg font-semibold'
                >Reset Password</h2>
                <p
                    className='text-foreground-secondary text-sm max-w-[350px]'
                >We will send a reset instruction mail to your registered email address</p>
            </div>
            <BasicForm
                fieldsData={fieldsData}
                setFieldsData={setFieldsData}
                submitButtoneText={{
                    inprogress: "Please wait",
                    normal: "Reset Password",
                }}
                onSubmit={async () => {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }}
            />
        </div>
    )
}

export default ForgetPasswordForm