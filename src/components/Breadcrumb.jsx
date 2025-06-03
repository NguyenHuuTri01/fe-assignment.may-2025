import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x && x !== "");

    const capitalize = (str) => {
        return str
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    };

    return (
        <nav className="flex text-[#7C7C7C] pl-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName = capitalize(name);
                    return (
                        <li key={routeTo} className="inline-flex items-center font-[500]">
                            {index > 0 && <span className="mx-1 text-gray-400">{">"}</span>}
                            {isLast ? (
                                <span className="text-[#005B86] text-[14px]">{displayName}</span>
                            ) : (
                                <Link
                                    to={routeTo}
                                    state={{
                                        path: routeTo,
                                        id: location.state?.id,
                                        name: location.name ? location.name : ""
                                    }}
                                    className="text-gray-600 hover:text-gray-900 text-[14px]"
                                >
                                    {displayName}
                                </Link>
                            )
                            }
                        </li>
                    );
                })}
            </ol>
        </nav >
    );
};

export default Breadcrumb;