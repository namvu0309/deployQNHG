export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("admin_user") || "{}");
};

export const hasPermission = (permission) => {
    const user = getCurrentUser();
    return user?.permissions?.includes(permission);
};

export const hasRole = (roleName) => {
    const user = getCurrentUser();
    return user?.roles?.some((role) => role.name === roleName);
};