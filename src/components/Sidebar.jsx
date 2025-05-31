import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, HelpCircle, Calculator, SquarePen, Building2Icon, BookOpenText, ExternalLink } from "lucide-react";
import LogoSidebar from '@/assets/LogoSidebar.jpg';
import LogoInitial from '@/assets/LogoInitial.png';
import LogoCollapse from '@/assets/LogoCollapse.png';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSidebarCollapsed = isMobile || isCollapsed;

    const toggleSidebar = () => {
        if (!isMobile) {
            setIsCollapsed(!isCollapsed);
        }
    };

    const navItems = [
        { path: "/overview", label: "Overview", icon: LayoutDashboard },
        { path: "/inquiries", label: "Inquiries", icon: HelpCircle },
        { path: "/estimator", label: "Estimator", icon: Calculator },
        { path: "/projects", label: "Projects", icon: SquarePen },
        { path: "/administration", label: "Administration", icon: Building2Icon },
        { path: "https://riverflow.solutions/", label: "Documentation", icon: BookOpenText },
    ];

    return (
        <div
            className={`flex flex-col h-screen transition-all duration-300 ${isSidebarCollapsed ? "w-[80px]" : "w-[242px]"
                } bg-gray-50 border-r border-gray-200`}
        >
            <div
                className={`p-2 flex ${isSidebarCollapsed ? "justify-center" : "justify-start mx-1"
                    } relative cursor-pointer`}
                onClick={toggleSidebar}
            >
                <Avatar className="h-10 w-10 rounded-none">
                    <AvatarImage src={LogoSidebar} alt="Header" />
                </Avatar>
                {!isSidebarCollapsed && (
                    <div className="mx-3 text-[#005B86]">
                        <div className="font-semibold text-[20px] leading-[24px]">
                            ABC Company
                        </div>
                        <div className="font-normal text-base leading-6 text-[16px]">
                            Lisa Rose
                        </div>
                    </div>
                )}
            </div>

            <nav className="flex-1 p-2 space-y-1">
                {navItems.slice(0, 4).map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-md transition-colors duration-200 ${isSidebarCollapsed ? "justify-center" : "justify-start"
                            } ${isActive
                                ? "bg-[#D3D3D3] text-[#005B86]"
                                : "text-[#7C7C7C] hover:bg-[#D3D3D3] hover:text-[#005B86]"
                            }`
                        }
                        onClick={isMobile ? toggleSidebar : undefined}
                    >
                        <item.icon className="h-5 w-5" />
                        {!isSidebarCollapsed && <span className="ml-2 text-[16px] font-[500]">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-2">
                <Separator className="my-2" />
                {navItems.slice(4).map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center w-full p-2 mt-1 rounded-md transition-colors duration-200 ${isSidebarCollapsed ? "justify-center" : "justify-start"
                            } text-[#7C7C7C] hover:bg-[#D3D3D3] hover:text-[#005B86]`}
                    >
                        <item.icon className="h-5 w-5" />
                        {!isSidebarCollapsed && (
                            <span className="ml-2 text-[16px] font-[500]">{item.label}</span>
                        )}
                    </a>
                ))}
            </div>
            <div
                className={`p-2 flex ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}
            >
                {isSidebarCollapsed ? (
                    <a href="https://riverflow.solutions/" target="_blank">
                        <Avatar className="h-[28px] w-[30px] rounded-none">
                            <AvatarImage src={LogoCollapse} />
                        </Avatar>
                    </a>
                ) :
                    <div className="flex w-[174px] justify-between items-center">
                        <a href="https://riverflow.solutions/" target="_blank">
                            <Avatar className="h-[32px] w-[134px] rounded-none">
                                <AvatarImage src={LogoInitial} />
                            </Avatar>
                        </a>
                        <div className="w-[18px] h-full">
                            <a href="https://riverflow.solutions/" target="_blank">
                                <ExternalLink className="text-[#005A86]" />
                            </a>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Sidebar;