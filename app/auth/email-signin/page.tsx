import EmailLoginForm from '@/components/elements/auth/email-login-form'
import AuthLayout from '@/layouts/auth'
import Link from 'next/link'
import { Suspense } from 'react'

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
        >
            <Suspense>
                <EmailLoginForm />
            </Suspense>
        </AuthLayout>
    )
}

export default EmailSigninPage