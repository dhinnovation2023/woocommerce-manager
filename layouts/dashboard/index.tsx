'use client';

import { PropsWithChildren, useEffect, useState } from 'react'
import DashboardHeader from './header'
import DashboardSidebar from './sidebar'
import DashboardBreadcrumps from './breadcrumps'
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ReduxProvider } from '@/providers/redux-provider';
import { Button } from '@/components/ui/button';

const DashboardLayout = ({
    children,
    initialActionBtns,
}: PropsWithChildren<{
    initialActionBtns?: {
        label: string,
        onClick: () => void,
    }[]
}>) => {

    const isMobile = useIsMobile();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    useEffect(() => {
        (() => setIsSidebarOpen(!isMobile))()
    }, [isMobile])

    return (
        <ReduxProvider>
            <div
                className='min-h-dvh w-full bg-background-secondary flex flex-col'
            >
                <DashboardHeader
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div
                    className='h-dvh pt-16.25 flex items-stretch'
                >
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <DashboardSidebar />
                        )}
                    </AnimatePresence>
                    <div
                        className='w-full max-h-full overflow-x-hidden overflow-y-auto py-8 px-5'
                    >
                        <div
                            className='max-w-277.5 mx-auto min-h-max'
                        >
                            <DashboardBreadcrumps />
                            {initialActionBtns && (
                                <div
                                    className='mb-8 flex items-center gap-2'
                                >
                                    {initialActionBtns.map((action, index) => (
                                        <Button
                                            key={index}
                                            onClick={action.onClick}
                                            variant={"theme"}
                                        >{action.label}</Button>
                                    ))}
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ReduxProvider>
    )
}

export default DashboardLayout