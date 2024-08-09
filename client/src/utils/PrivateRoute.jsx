import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function PrivateRoute({ children })
{
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() =>
    {
        if (!currentUser)
        {
            navigate('/')
        }
    }, [currentUser])

    return (<div>{children}</div>);
}

export default PrivateRoute;
