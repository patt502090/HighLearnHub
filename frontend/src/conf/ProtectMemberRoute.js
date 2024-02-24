import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth.context";

const ProtectMemberRoute = ({ children }) => {
    const { state: ContextState } = useContext(AuthContext);
    const { userRole } = ContextState;
    return userRole === "member" ? children : <><Navigate to="/login" replace /></>;
};

export default ProtectMemberRoute;