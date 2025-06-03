import React from "react";
import { useLocation } from "react-router-dom";
import { NotepadText, Clock, ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

const listActivity = [
    { text: 'RFX David Nguyen Submitted to underwriting', time: '2025-04-04 13:00:38' },
    { text: 'ABC Lisa Rose approval', time: '2025-04-04 11:10:38' },
    { text: 'RFX David Nguyen Submitted to underwriting', time: '2025-04-04 08:00:00' },
    { text: 'ABC Lisa Rose create an issue', time: '2025-04-03 17:10:38' },
];


const ProjectSubDetail = () => {

    const [valueArea, setValueArea] = useState("");
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        setActivity(listActivity)
    }, [])

    const location = useLocation();
    const stateValue = location.state

    let listDescription = [
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
        deserunt mollit anim id est laborum.
        `,
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
        deserunt mollit anim id est laborum.
        `
    ]


    const colorMap = [
        'bg-[#22AD5C]',
        'bg-[#005A86]',
    ];

    const getLocalDateTimeString = () => {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, "0");

        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleSubmit = () => {
        if (!valueArea.trim()) {
            alert("Please add a comment...")
            return
        }
        const newActivity = {
            text: valueArea,
            time: getLocalDateTimeString(),
        };
        setActivity((prev) => [...prev, newActivity])
        setValueArea("")
    }

    return (
        <div>
            {
                location.pathname == stateValue?.path &&
                <div className="flex justify-between">
                    <div className="w-3/4 border-r-2 pr-4">
                        <div className="w-full border-b-2 pb-3 flex gap-1.5 text-[#7C7C7C] text-[16px] items-center">
                            <NotepadText size={20} />
                            <label>Description</label>
                        </div>
                        <div className="w-full">
                            {
                                listDescription && listDescription.length > 0 &&
                                listDescription.map((item, index) => (
                                    <ul className="list-[circle] pl-6" key={`des-${index}`}>
                                        <li className="text-[#7C7C7C] text-[14px] marker:text-[#005B86] marker:text-[20px]">
                                            {item}
                                        </li>
                                    </ul>
                                ))
                            }

                        </div>
                        <div className="my-9 text-[#005B86] text-[14px] font-[400]">
                            <a className="cursor-pointer hover:text-[#8bc1ef]">+ Add sub-tickets</a>
                        </div>
                        <div className="w-full border-b-2 pb-3 flex gap-1.5 text-[#7C7C7C] text-[16px] items-center">
                            <NotepadText size={20} />
                            <label>Activity</label>
                        </div>
                        <div className="pt-2">
                            <ul className="relative pl-6">
                                {activity && activity.length > 0 &&
                                    activity.map((item, index) => (
                                        <li key={`activity-${index}`} className="relative pb-4">
                                            {index < activity.length - 1 && (
                                                <span className="absolute left-[-0.75rem] top-2 w-px h-full bg-gray-300"></span>
                                            )}
                                            <span
                                                className={`absolute left-[-1.375rem] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${colorMap[index % 2]}`}
                                            ></span>
                                            <div className="text-[#6F6F6F] flex items-center">
                                                <label>{item.text ? item.text : ""}</label>
                                                <Clock size={18} className="mx-2" />
                                                <label>{item.time ? item.time : ""}</label>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <Textarea
                                placeholder="Leave a comment..."
                                className={"min-h-20"}
                                value={valueArea}
                                onChange={(e) => setValueArea(e.target.value)}
                            />
                            <span onClick={() => handleSubmit()}>
                                <ArrowUp className="absolute bottom-2 right-3.5 text-[#005B86] cursor-pointer" />
                            </span>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="w-full border-b-2 pb-3 pl-3 flex gap-1.5 text-[#7C7C7C] text-[16px] items-center">
                            Properties
                        </div>
                        <div className="w-full pl-3 pt-2 text-[#7C7C7C] text-[16px] items-center">
                            <div className="flex mb-2">
                                <label className="min-w-38">Status:</label>
                                <select id="Status" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a status</option>
                                    <option value="InProgress">In-Progress</option>
                                    <option value="OutProgress">Out-Progress</option>
                                </select>
                            </div>
                            <div className="flex mb-2">
                                <label className="min-w-38">Priority:</label>
                                <select id="status" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a Priority</option>
                                    <option value="Critical">Critical</option>
                                    <option value="Praise">Praise</option>
                                </select>
                            </div>
                            <div className="flex mb-2">
                                <label className="min-w-38">Assignee:</label>
                                <select id="Assignee" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a Assignee</option>
                                    <option value="Trangntt">Trangntt</option>
                                    <option value="Hongntt">Hongntt</option>
                                </select>
                            </div>
                            <div className="flex mb-2">
                                <label className="min-w-38">Type:</label>
                                <select id="Type" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a type</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Success">Success</option>
                                </select>
                            </div>
                            <div className="flex mb-2">
                                <label className="min-w-38">Started date:</label>
                                <select id="StartedDate" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a date</option>
                                    <option value="started1">2025-04-04</option>
                                    <option value="started2">2025-04-05</option>
                                </select>
                            </div>
                            <div className="flex mb-2">
                                <label className="min-w-38">Target date:</label>
                                <select id="TargetDate" className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-35 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Choose a date</option>
                                    <option value="target1">2025-04-04</option>
                                    <option value="target2">2025-04-05</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectSubDetail;