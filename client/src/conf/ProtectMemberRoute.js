import { Navigate } from 'react-router-dom';
import conf from './main';

const ProtectMemberRoute = ({ children }) => {
    const role = sessionStorage.getItem(conf.roleSessionStorageKey);
    return role === conf.memberStorageKey ? children : <><Navigate to="/login" replace /></>;
};

export default ProtectMemberRoute;