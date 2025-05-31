import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";



const ProjectDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateValue = location.state

    const pathnames = location.pathname.split("/").filter((x) => x && x !== "");
    const shouldShowTiles = pathnames.length === 2;

    const tiles = [
        { id: "project-detail-a", label: "Project Detail A", path: `${stateValue ? stateValue.path : "/" + pathnames[0] + "/" + pathnames[1]}/a` },
        { id: "project-detail-b", label: "Project Detail B", path: `${stateValue ? stateValue.path : "/" + pathnames[0] + "/" + pathnames[1]}/b` },
        { id: "project-detail-c", label: "Project Detail C", path: `${stateValue ? stateValue.path : "/" + pathnames[0] + "/" + pathnames[1]}/c` },
        { id: "project-detail-d", label: "Project Detail D", path: `${stateValue ? stateValue.path : "/" + pathnames[0] + "/" + pathnames[1]}/d` },
    ];

    return (
        <div className="p-6">
            {location.pathname == stateValue?.path && shouldShowTiles && (
                <div className="grid grid-cols-2 gap-6">
                    {tiles.map((tile) => (
                        <div
                            key={tile.path}
                            onClick={() => navigate(tile.path, { state: { id: tile.id, path: tile.path } })}
                            className="cursor-pointer rounded-lg border border-gray-300 bg-white p-6 text-center font-semibold text-gray-800 shadow hover:bg-gray-100 transition-all"
                        >
                            {tile.label}
                        </div>
                    ))}
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default ProjectDetail;