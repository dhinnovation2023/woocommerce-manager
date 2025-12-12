
const pageTitlesConfig: {
    [key: string]: string,
} = {
    "/app": "Dashboard",
    "#/app/woocommerce": "WooCommerce",
    "/app/woocommerce/orders": "View Orders",

    // Users Manager
    "/app/users-manager": "Manager Users",
    "/app/users-manager/add": "Add User",
}

const breadcrumps: {
    [pageUrl: string]: string[],
} = {
    "/app": ["/app"],
    "/app/woocommerce/orders": ["/app", "#/app/woocommerce", "/app/woocommerce/orders"],
    "/app/users-manager": ["/app", "/app/users-manager"],
    "/app/users-manager/add": ["/app", "/app/users-manager", "/app/users-manager/add"],
}

export { breadcrumps, pageTitlesConfig }