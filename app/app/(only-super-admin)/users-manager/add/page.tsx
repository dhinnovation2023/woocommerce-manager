'use client';

import BasicForm from '@/components/elements/ui/basic-form'
import { Card } from '@/components/ui/card';
import { handleCatchBlock } from '@/functions/error-handler';
import { handleFormInputDirectOnChange } from '@/functions/form-handlers';
import DashboardLayout from '@/layouts/dashboard'
import { InputGroupType } from '@/types/input-group-type';
import { RiAtLine, RiKeyLine, RiPenNibLine, RiUser4Line } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddUserPage = () => {

  const router = useRouter()

  const [formData, setFormData] = useState<{
    name: string,
    displayName: string,
    email: string,
    password: string,
    repassword: '',
  }>({
    displayName: '',
    email: '',
    name: '',
    password: '',
    repassword: '',
  });

  const [fieldsData, setFieldsData] = useState<InputGroupType[]>([
    {
      name: "name",
      onChange: (event) => handleFormInputDirectOnChange(event, setFormData),
      required: true,
      value: formData["name"],
      icon: RiUser4Line,
      invalid: false,
      label: "Full Name",
      placeholder: "Full Name",
      type: "text",
    },
    {
      name: "displayName",
      onChange: (event) => handleFormInputDirectOnChange(event, setFormData),
      required: true,
      value: formData["displayName"],
      icon: RiPenNibLine,
      invalid: false,
      label: "Display Name",
      placeholder: "Display Name",
      type: "text",
    },
    {
      name: "email",
      onChange: (event) => handleFormInputDirectOnChange(event, setFormData),
      required: true,
      value: formData["email"],
      icon: RiAtLine,
      invalid: false,
      label: "Email Address",
      placeholder: "Email Address",
      type: "email",
    },
    {
      name: "password",
      onChange: (event) => handleFormInputDirectOnChange(event, setFormData),
      required: true,
      value: formData["password"],
      icon: RiKeyLine,
      invalid: false,
      label: "Password",
      placeholder: "Password",
      type: "password",
      isPassword: true,
    },
    {
      name: "repassword",
      onChange: (event) => handleFormInputDirectOnChange(event, setFormData),
      required: true,
      value: formData["repassword"],
      icon: RiKeyLine,
      invalid: false,
      isPassword: true,
      label: "Password Again",
      placeholder: "Enter Password Again",
      type: "password",
    }
  ]);

  useEffect(() => {
    (() => {
      setFieldsData(prev => {
        const updates: InputGroupType[] = prev.map((item) => ({
          ...item,
          value: formData[item.name as keyof typeof formData] || '',
        }))
        return updates;
      })
    })()
  }, [formData])

  return (
    <DashboardLayout>
      <Card
        className='px-7'
      >
        <BasicForm
          fieldsData={fieldsData}
          setFieldsData={setFieldsData}
          submitButtoneText={{
            normal: "Add User",
            inprogress: "Adding User...",
          }}
          onSubmit={async () => {
            try {

              if (formData.password !== formData.repassword) {
                throw new Error("Passwords not matching!")
              }
              await new Promise(resolve => setTimeout(resolve, 5000));
              toast.success("User Added.");

              router.push("/app/users-manager")

            } catch (err) {
              const message = handleCatchBlock(err);
              toast.error(message);
            }
          }}
        />
      </Card>
    </DashboardLayout>
  )
}

export default AddUserPage