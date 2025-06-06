import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex-1 overflow-auto bg-gray-50">
            <Outlet />
        </div>
    );
};

export default AdminLayout;