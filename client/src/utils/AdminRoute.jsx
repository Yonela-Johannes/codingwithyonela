import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminPrivateRoute({ children })
{
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser?.is_admin ? (
        <div className="">{children}</div>
    ) : (
        <Navigate to='/' />
    );
}