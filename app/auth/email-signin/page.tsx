import AuthLayout from '@/layouts/auth'
import Link from 'next/link'

const EmailSigninPage = async () => {
    return (
        <AuthLayout
            heading={
                <>Sign In to Your <span className='text-theme-primary'>Workspace</span></>
            }
            content='Manage orders, track inventory, process fulfillment, support customers, and streamline store operations from one platform.'
            afterContent={
                <p>
                    Forgot password?
                    <Link
                        href={'/auth/forget-password'}
                        className='text-action-button font-semibold'
                    >&nbsp;Reset</Link>
                </p>
            }
        ></AuthLayout>
    )
}

export default EmailSigninPage