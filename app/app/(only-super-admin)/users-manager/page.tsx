'use client';

import { TableTemplate } from '@/components/elements/ui/table';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard'
import { RiUser4Line } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UsersManagerPage = () => {

  const router = useRouter();

  const [inProgress, setInProgress] = useState<boolean>(false);

  return (
    <DashboardLayout
      initialActionBtns={[
        {
          label: "Add User",
          onClick: () => {
            router.push("/app/users-manager/add");
          }
        },
      ]}
    >
      <TableTemplate
        inProgress={inProgress}
        headerRow={[
          "User",
          "Full Name",
          "Created At",
          "Actions",
        ]}
        dataRow={[
          [
            <div
              className='flex items-center gap-3'
            >
              <div
                className='w-8 h-8 shrink-0 bg-background-secondary shadow-sm flex items-center justify-center rounded-full'
              >
                <RiUser4Line
                  size={20}
                  className='text-foreground/40'
                />
              </div>
              <div>
                <p
                  className='text-base font-semibold'
                >{"John David"}</p>
                <p
                  className='text-sm text-foreground-secondary'
                >{"john@gmail.com"}</p>
              </div>
            </div>,
            "Jogn David Paul",
            "12/12/2025",
            <div>
              <Button
                variant={"outline"}
              >Edit</Button>
            </div>
          ]
        ]}
        handlePagination={() => { }}
        onPerPageChange={() => { }}
        pageNumber={1}
        perPage={10}
      />
    </DashboardLayout>
  )
}

export default UsersManagerPage