export const config = {
    admin: {
        name: 'admin',
        route: '/admin',
        accessLevel: 'ADMIN',
        newRequests: {
            name: 'newRequests',
            route: '/admin/newRequests',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        pendingRequests: {
            name: 'pendingRequests',
            route: '/admin/pendingRequests',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        approvedRequests: {
            name: 'approvedRequests',
            route: '/admin/approvedRequests',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        rejectedRequests: {
            name: 'rejectedRequests',
            route: '/admin/rejectedRequests',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        userList: {
            name: 'userList',
            route: '/admin/userList',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        editOrganization: {
            name: 'editOrganization',
            route: '/admin/editOrganization',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        editUser: {
            name: 'editUser',
            route: '/admin/editUser',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        addAdmin: {
            name: 'addAdmin',
            route: '/admin/addAdmin',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        adminList: {
            name: 'adminList',
            route: '/admin/adminList',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        addOrganization: {
            name: 'addOrganization',
            route: '/admin/addOrganization',
            accessLevel: 'ADMIN',
            disableRefresh: false
        },
        editRatePlan: {
            name: 'editRatePlan',
            route: '/admin/editRatePlan',
            accessLevel: 'ADMIN',
            disableRefresh: false
        }
    },
    owner: {
        name: 'owner',
        route: '/owner',
        accessLevel: 'OWNER',
        userList: {
            name: 'userList',
            route: '/owner/userList',
            accessLevel: 'OWNER',
            disableRefresh: false
        }
    },
    payment: {
        name: 'payment',
        route: '/payment',
        accessLevel: 'OWNER',
        address: {
            name: 'address',
            route: '/payment/address',
            accessLevel: 'OWNER',
            disableRefresh: false
        },
        rateplan: {
            name: 'rateplan',
            route: '/payment/rateplan',
            accessLevel: 'OWNER',
            disableRefresh: false
        },
        payment: {
            name: 'payment',
            route: '/payment/payment',
            accessLevel: 'OWNER',
            fallBackURL: '/payment/rateplan',
            disableRefresh: true
        },
        manualPayment: {
            name: 'manualPayment',
            route: '/payment/manualPayment',
            accessLevel: 'OWNER',
            fallBackURL: '/payment/rateplan',
            disableRefresh: true
        },
        success: {
            name: 'success',
            route: '/payment/success',
            accessLevel: 'OWNER',
            disableRefresh: false
        }
    },
}