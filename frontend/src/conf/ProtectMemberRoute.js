import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth.context";
import toast,{ Toaster } from 'react-hot-toast';

const ProtectMemberRoute = ({ children }) => {
    const { state: ContextState } = useContext(AuthContext);
    const { userRole } = ContextState;
    toast.error("กรุณาเข้าสู่ระบบ!!");
    return userRole === "member" ? children : <><Toaster position="top-right" reverseOrder={false} /><Navigate to="/login" replace /></>;
};

export default ProtectMemberRoute;