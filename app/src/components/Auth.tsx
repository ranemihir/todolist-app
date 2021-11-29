import { Navigate, useLocation } from "react-router-dom";
import { User } from "../../../types";

export const Auth = (props: { children: JSX.Element, currentUser: User | null; }) => {
    const { children, currentUser } = props;
    const location = useLocation();

    if (currentUser && currentUser != null) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} />;
};