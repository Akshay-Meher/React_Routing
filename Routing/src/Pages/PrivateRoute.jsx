
import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';

const isAuthenticated = () => {

    return true;
};

const PrivateRoute = ({ Comp, ...rest }) => {
    const { isLogin, setIsLogin, localUser } = useContext(LoginContext);
    console.log("Prive- localuser", localUser);

    if (!localUser?.isLogin) {
        return <Navigate to="/login" />;
    }
    return <Comp />;
};

export default PrivateRoute;
