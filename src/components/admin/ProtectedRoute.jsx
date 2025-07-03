import React from "react";
import { Navigate } from "react-router-dom";
import { hasPermission } from "@services/admin/permissionUtils.js";

export default function ProtectedRoute({ permission, children }) {
    if (!hasPermission(permission)) {
        return <Navigate to="/403" />;
    }
    return children;
}
