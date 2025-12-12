import { Dispatch, SetStateAction, useEffect } from 'react'
import HeaderGlobalSearch from './search'
import { RiAccountCircleLine, RiMenuUnfold3Line, RiMenuUnfold4Line, RiNotification4Line } from '@remixicon/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { handleCatchBlock } from '@/functions/error-handler'
import { getSession } from 'next-auth/react'
import { initialize } from '@/store/user-slice'

const DashboardHeader = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
}) => {

    const session = useSelector((state: RootState) => state.userSlice.session);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                if (!session) {
                    const userSession = await getSession();
                    if (userSession?.user) {
                        dispatch(initialize(userSession))
                    }
                }
            } catch (err) {
                const message = handleCatchBlock(err);
                console.error(message);
            }
        })()
    }, [dispatch, session])

    return (
        <div
            className='bg-background border-b border-stroke-light py-3 px-6 absolute top-0 left-0 w-full min-h-16.25 flex items-center'
        >
            <div
                className='flex items-center justify-between w-full'
            >
                <div
                    className='flex items-center gap-4'
                >
                    <button
                        className='shrink-0 md:hidden'
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                    >
                        {isSidebarOpen ? (
                            <RiMenuUnfold4Line
                                size={25}
                            />
                        ) : (
                            <RiMenuUnfold3Line
                                size={25}
                            />
                        )}
                    </button>
                    <h2
                        className='text-xl font-extrabold shrink-0'
                    >Howdy, {session?.user?.name} &#128075;</h2>
                </div>

                <div
                    className='hidden md:block'
                >
                    <HeaderGlobalSearch />
                </div>

                <div
                    className='flex items-center gap-5'
                >
                    <button
                        className='cursor-pointer'
                    >
                        <RiNotification4Line
                            size={23}
                        />
                    </button>
                    <button
                        className='cursor-pointer'
                    >
                        <RiAccountCircleLine
                            size={23}
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DashboardHeader