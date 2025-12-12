import { PropsWithChildren, ReactNode } from 'react'

const AuthLayout = async ({
    children,
    content,
    heading,
    afterContent,
}: PropsWithChildren<{
    heading: ReactNode | string,
    content: string,
    afterContent: ReactNode,
}>) => {
    return (
        <div
            className='min-h-dvh w-full flex flex-col md:flex-row items-stretch justify-between'
        >
            <div
                className='w-full py-8 px-5'
            >
                <div
                    className='flex items-center w-full h-full flex-col justify-center'
                >
                    {children}
                </div>
            </div>
            <div
                className='w-full bg-theme-primary/10 py-8 px-5'
            >
                <div
                    className='max-w-100 mx-auto min-h-full flex flex-col justify-center gap-5'
                >
                    <h1
                        className='text-5xl font-bold leading-15.5'
                    >{heading}</h1>
                    <p>{content}</p>
                    {afterContent}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout