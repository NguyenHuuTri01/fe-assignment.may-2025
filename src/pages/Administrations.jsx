import React, { useState } from "react"
import { Home, Bell, Settings, CircleUserRound, ChevronDown, ChevronUp, Funnel, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserTable from "@/components/UserTable";
import LoanDashboard from "@/components/LoanDashboard";

const users = [
    {
        name: "Mr. David Nguyen",
        id: "LO0001",
        phone: "(322) 243-3452",
        email: "david.nguyen@gmail.com",
        type: "Loan Officer",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Mr. David Nguyen",
        id: "LO0002",
        phone: "(322) 243-3452",
        email: "david.nguyen@gmail.com",
        type: "Loan Officer",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Mr. David Nguyen",
        id: "LO0003",
        phone: "(322) 243-3452",
        email: "david.nguyen@gmail.com",
        type: "Loan Officer",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Mr. David Nguyen",
        id: "LO0004",
        phone: "(322) 243-3452",
        email: "david.nguyen@gmail.com",
        type: "Loan Officer",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Mr. David Nguyen",
        id: "LO0005",
        phone: "(322) 243-3452",
        email: "david.nguyen@gmail.com",
        type: "Loan Officer",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Ms. Jennie Pink",
        id: "UW00002",
        phone: "(322) 243-3452",
        email: "jenniepink@gmail.com",
        type: "Underwriter",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Ms. Jennie Pink",
        id: "UW00003",
        phone: "(322) 243-3452",
        email: "jenniepink@gmail.com",
        type: "Underwriter",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Ms. Jennie Pink",
        id: "UW00004",
        phone: "(322) 243-3452",
        email: "jenniepink@gmail.com",
        type: "Underwriter",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Ms. Jennie Pink",
        id: "UW00005",
        phone: "(322) 243-3452",
        email: "jenniepink@gmail.com",
        type: "Underwriter",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Ms. Jennie Pink",
        id: "UW00006",
        phone: "(322) 243-3452",
        email: "jenniepink@gmail.com",
        type: "Underwriter",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Mr. Pep Guardiola",
        id: "LP00001",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
        name: "Mr. Pep Guardiola",
        id: "LP00002",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
        name: "Mr. Pep Guardiola",
        id: "LP00003",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
        name: "Mr. Pep Guardiola",
        id: "LP00004",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
        name: "Mr. Pep Guardiola",
        id: "LP00005",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
        name: "Mr. Pep Guardiola",
        id: "LP00006",
        phone: "(322) 243-3452",
        email: "pepguardiola@gmail.com",
        type: "Loan Processor",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        name: "Mr. Bruno Mar",
        id: "AD00001",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },

    {
        name: "Mr. Bruno Mar",
        id: "AD00002",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },

    {
        name: "Mr. Bruno Mar",
        id: "AD00003",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },

    {
        name: "Mr. Bruno Mar",
        id: "AD00004",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },

    {
        name: "Mr. Bruno Mar",
        id: "AD00005",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },

    {
        name: "Mr. Bruno Mar",
        id: "AD00006",
        phone: "(322) 243-3452",
        email: "brunomars@gmail.com",
        type: "Admin",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
        name: "Mr. David Beckham",
        id: "ME00001",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },

    {
        name: "Mr. David Beckham",
        id: "ME00002",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },

    {
        name: "Mr. David Beckham",
        id: "ME00003",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },

    {
        name: "Mr. David Beckham",
        id: "ME00004",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },

    {
        name: "Mr. David Beckham",
        id: "ME00005",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },

    {
        name: "Mr. David Beckham",
        id: "ME00006",
        phone: "(322) 243-3452",
        email: "davidbeckham@gmail.com",
        type: "Member",
        experience: "5 years",
        status: "ACTIVE",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
];


const Administrations = () => {
    const [position, setPosition] = useState("bottom")
    const [isShowToggle, setIsShowToggle] = useState(false)
    const [notification, setNotification] = useState(2);


    return (
        <div className="h-screen flex flex-col">
            <div className="h-14 flex justify-between bg-[#294172]">
                <div className='flex items-center'>
                    <div className='w-60 h-full flex justify-center items-center text-[#00B25C] text-[16px] font-[500]'>
                        COMPANY LOGO XXX
                    </div>
                    <span className='w-16 h-full flex justify-center items-center'>
                        <Home size={28} color='#fff' className='cursor-pointer' />
                    </span>
                    <div className='h-[80%] border-2 px-4 bg-[#DAE6EF] text-[#294172] select-none cursor-pointer rounded-[5px]'>
                        <div className='text-[12px] font-[400]'>Mudule</div>
                        <div className='text-[14px] font-[700]'>USER MANAGEMENT</div>
                    </div>
                </div>
                <div className='flex pr-10'>
                    <div className='justify-center items-center flex px-5 gap-5 select-none'>
                        <div
                            className="relative inline-block cursor-pointer"
                            onClick={() => setNotification(notification + 1)}
                        >
                            <Bell size={30} color="#fff" />
                            <div className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full flex justify-center items-center text-white text-xs">
                                {notification}
                            </div>
                        </div>
                        <Settings size={30} color="#fff"
                            className="cursor-pointer"
                        />
                        <CircleUserRound size={30} color="#fff"
                            className="cursor-pointer"
                        />
                    </div>
                    <div className=''>
                        <div className='min-w-40 h-full pl-3 flex items-center'>
                            <div className=''>
                                <label className='text-[14px] block font-[700] text-[#FFFFFF]'>
                                    Mr.David Nguyen
                                </label>
                                <label className='text-[12px] block font-[500] text-[#FFFFFF]'>
                                    Home Company
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <DropdownMenu onOpenChange={() => setIsShowToggle(!isShowToggle)}>
                            <DropdownMenuTrigger
                                asChild
                                className="text-[#FFFFFF] h-full flex items-center cursor-pointer"
                            >
                                {
                                    isShowToggle ? <ChevronUp size={30} /> : <ChevronDown size={30} />
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex w-full">
                <div className="w-[15%] h-full">
                    <div className="max-w-md h-full mx-auto p-4 bg-white shadow-md flex flex-col space-y-4">
                        <div className="flex justify-between text-2xl items-center text-[#767676]">
                            <span>FILTER</span>
                            <Funnel />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">User Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter user name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">User ID</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter user ID"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">User Type</label>
                            <select
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select type</option>
                                <option value="loanofficer">Loan Officer</option>
                                <option value="underwriter">Underwriter</option>
                                <option value="loanprocessor">Loan Processor</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">User Number</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter user number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter email address"
                            />
                        </div>

                        <div>
                            <span className="block text-sm font-medium text-gray-700 mb-2">Status</span>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox text-blue-600" />
                                    <span>All</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox text-blue-600" />
                                    <span>Active</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox text-blue-600" />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-auto pt-4">
                            <button className="w-full py-2 text-[14px] text-[#4A4B57] rounded-[5px] border-2 border-[#DFE4EA] transition">
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[42%] h-full">
                    <UserTable users={users} totalUsers={users.length} />
                </div>
                <div className="w-[43%] h-[650px] overflow-y-auto">
                    <LoanDashboard />
                </div>
            </div>
        </div>
    );
};

export default Administrations;