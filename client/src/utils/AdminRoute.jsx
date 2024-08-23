import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from '../shared/dashboard/Layout';

export default function AdminPrivateRoute({ children })
{
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser?.is_admin || currentUser.is_staff ? (
        <div className="">
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    ) : (
        <Navigate to='/' />
    );
}