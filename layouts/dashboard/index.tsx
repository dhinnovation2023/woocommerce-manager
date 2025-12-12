'use client';

import { PropsWithChildren, useEffect, useState } from 'react'
import DashboardHeader from './header'
import DashboardSidebar from './sidebar'
import DashboardBreadcrumps from './breadcrumps'
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = ({
    children,
}: PropsWithChildren) => {

    const isMobile = useIsMobile();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    useEffect(() => {
        (() => setIsSidebarOpen(!isMobile))()
    }, [isMobile])

    return (
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
                        <DashboardBreadcrumps/>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout