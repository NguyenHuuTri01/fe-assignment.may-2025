import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";

function Estimator() {
    const navigate = useNavigate();

    const pathnames = location.pathname.split("/").filter((x) => x && x !== "");
    const shouldShowTiles = pathnames.length === 1;

    const listPackages = [
        { id: "wps", name: "Work Packages (WP)" },
        { id: "tps", name: "Talk Packages", }
    ]


    const handleViewPackage = (pkg) => {
        const path = pkg.name.toLowerCase().replace(/\s+/g, '-')
        navigate(path, { state: { id: pkg.id, path: path, name: pkg.name } })
    }

    return (
        <div className="px-2">
            {shouldShowTiles &&
                listPackages && listPackages.length > 0 &&
                listPackages.map((pkg, index) => (
                    <div
                        className='border-2 p-4 mb-2 rounded-[5px] text-[#7C7C7C] hover:bg-[#D3D3D3] hover:text-[#005B86] cursor-pointer'
                        key={`pkg-${index}`}
                        onClick={() => handleViewPackage(pkg)}
                    >
                        {pkg.name}
                    </div>
                ))
            }
            <Outlet />
        </div>
    )
}

export default Estimator
