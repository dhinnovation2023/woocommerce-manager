import ForgetPasswordForm from '@/components/elements/auth/forget-password-form'
import AuthLayout from '@/layouts/auth'
import Link from 'next/link'
import React from 'react'

const ForgetPasswordPage = () => {
    return (
        <AuthLayout
            heading={
                <>Forgot Your
                    <span
                        className='text-theme-primary'
                    >&nbsp;Password?</span>
                </>
            }
            content='Enter your registered email address and we’ll send you instructions to reset your password securely.'
            afterContent={
                <p>
                    Already exist?
                    <Link
                        href={'/auth/email-signin'}
                        className='text-action-button font-semibold'
                    >&nbsp;SignIn</Link>
                </p>
            }
        >
            <ForgetPasswordForm/>
        </AuthLayout>
    )
}

export default ForgetPasswordPage