import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex-1 p-4 overflow-auto bg-gray-50">
            <Outlet />
        </div>
    );
};

export default AdminLayout;