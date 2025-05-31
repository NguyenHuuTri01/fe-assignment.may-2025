import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const tiles = [
    { id: "urapidLoan-project", label: "UrapidLoan Project", path: "/projects/urapidLoan-project" },
    { id: "project-b", label: "Project B", path: "/projects/project-b" },
    { id: "project-c", label: "Project C", path: "/projects/project-c" },
    { id: "project-d", label: "Project D", path: "/projects/project-d" },
];

function Projects() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x && x !== "");
    const shouldShowTiles = pathnames.length === 1;

    return (
        <div className="p-6">
            {shouldShowTiles && (
                <div className="grid grid-cols-2 gap-6">
                    {tiles.map((tile) => (
                        <div
                            key={tile.path}
                            onClick={
                                () => navigate(tile.path, { state: { id: tile.id, path: tile.path } })
                            }
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
}

export default Projects;