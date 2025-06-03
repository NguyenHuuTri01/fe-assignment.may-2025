import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { List, ArrowRight } from "lucide-react";
import PackageItem from "./PackageItem";


const options = [
    { value: "radio1", label: "All Work Packages" },
    { value: "radio2", label: "Architectural WPs" },
    { value: "radio3", label: "Development WPs" },
    { value: "radio4", label: "Operation WPs" },
    { value: "radio5", label: "Basic" },
    { value: "radio6", label: "Comprehensive" },
    { value: "radio7", label: "Advanced" }
];

const listPackages = [
    {
        id: "pkg1",
        Title: "Work package 1",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: "pkg2",
        Title: "Work package 2",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: "pkg3",
        Title: "Work package 3",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: "pkg4",
        Title: "Work package 4",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: "pkg5",
        Title: "Work package 5",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: "pkg6",
        Title: "Work package 6",
        Description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    }
]

const Packages = () => {
    const location = useLocation();
    const [selected, setSelected] = useState("");
    const stateValue = location.state;

    useEffect(() => {
        setSelected(options[0]?.value)
    }, [])

    return (
        <div>
            {
                stateValue && location.pathname?.includes(stateValue?.path) &&
                <div className="px-10">
                    <div className="text-[20px] text-[#343434] font-[500] mb-4">
                        {stateValue?.name}
                    </div>
                    <div className="flex mb-15">
                        <div className="w-1/4">
                            <div className="flex flex-col space-y-2">
                                <Tabs
                                    defaultValue="rfxwps"
                                    className="w-3/4"
                                >
                                    <TabsList
                                        className={"rounded-[5px] bg-white border-2"}
                                    >
                                        <TabsTrigger
                                            value="rfxwps"
                                            className={"text-[14px] font-[400] rounded-none text-[#7C7C7C] data-[state=active]:bg-[#E2F5F9] data-[state=active]:text-[#005B86]"}
                                        >RFX WPs</TabsTrigger>
                                        <TabsTrigger
                                            value="customwps"
                                            className={"text-[14px] font-[400] rounded-none text-[#7C7C7C] data-[state=active]:bg-[#E2F5F9] data-[state=active]:text-[#005B86]"}
                                        >Custom WPs</TabsTrigger>
                                    </TabsList>
                                    <div className="text-[18px] font-[500] text-[#343434] mb-1 mt-4">
                                        Categories
                                    </div>
                                    <TabsContent value="rfxwps" className={""}>
                                        {options && options.length > 0 &&
                                            options.map((option, index) => (
                                                <label key={index} className="mt-2 block cursor-pointer text-[14px] font-[500] border-b-2 pb-1.5">
                                                    <input
                                                        type="radio"
                                                        name="text-only-radio"
                                                        value={option.value}
                                                        checked={selected === option.value}
                                                        onChange={() => setSelected(option.value)}
                                                        className="hidden"
                                                    />
                                                    <span
                                                        className={`${selected === option.value ? "text-[#005B86]" : "text-[#7C7C7C]"}`}
                                                    >
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                    </TabsContent>
                                    <TabsContent value="customwps">
                                        Custom WPs here.
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                        <div className="w-3/4">
                            <div className="mb-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[5px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="h-[440px] overflow-auto grid xl:grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-2">
                                {
                                    listPackages && listPackages.length > 0 &&
                                    listPackages.map((item, index) => (
                                        <div key={`pkgi-${index}`} className="border-2 border-[#D3D3D3] h-50">
                                            <PackageItem data={item} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-[#005B86] text-[14px] font-[500]">
                        <div className="flex gap-1 italic">
                            <List size={20} />
                            How to add custom WPs
                        </div>
                        <button className="border-[#005A86] rounded-[10px] border-2 px-3 py-1 flex cursor-pointer hover:bg-[#D3D3D3]">
                            Next
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Packages;