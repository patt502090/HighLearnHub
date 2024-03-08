import { Navigate } from 'react-router-dom';
import conf from './main';

const ProtectRoute = ({ children }) => {
    const role = sessionStorage.getItem(conf.roleSessionStorageKey);
    return role === conf.adminStorageKey ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;

