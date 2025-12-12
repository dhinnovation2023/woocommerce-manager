import React, { PropsWithChildren } from 'react'

const OnlySuperAdminPageLayout = async ({
    children,
}: PropsWithChildren) => {

    console.log("Log in Server")

    return (
        <>{children}</>
    )
}

export default OnlySuperAdminPageLayout