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
            className='min-h-dvh w-full flex items-stretch'
        >
            <div
                className='w-full'
            >Auth Layout</div>
            <div
                className='w-full bg-theme-primary/10'
            >
                <div
                    className='max-w-[400px] mx-auto min-h-full flex flex-col justify-center gap-5'
                >
                    <h1
                        className='text-5xl font-bold leading-[62px]'
                    >{heading}</h1>
                    <p>{content}</p>
                    {afterContent}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout