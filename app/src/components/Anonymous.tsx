import { Navigate, useLocation } from "react-router-dom";
import { User } from "../../../types";

export const Anonymous = (props: { children: JSX.Element, currentUser: User | null; }) => {
    const { children, currentUser } = props;
    const location = useLocation();

    if (currentUser && currentUser != null) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
};