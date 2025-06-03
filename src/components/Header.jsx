import React, { useEffect, useState } from 'react'
import Breadcrumb from './Breadcrumb'
import { useLocation } from "react-router-dom";
import { List } from "lucide-react";

export default function Header({ contentKey }) {
    const location = useLocation();
    const [viewSummary, setViewSummary] = useState(false);

    useEffect(() => {
        displayViewSummary()
    }, [])

    useEffect(() => {
        displayViewSummary()
    }, [location.pathname])

    const displayViewSummary = () => {
        const pathnames = location.pathname.split("/").filter((x) => x && x !== "");
        if (pathnames.length == 2 && pathnames[0] == "estimator") {
            setViewSummary(true)
        } else {
            setViewSummary(false)
        }
    }

    return (
        <div className="relative border-b border-gray-300 py-4 bg-white shadow-sm flex justify-between pr-5">
            <Breadcrumb contentKey={contentKey} />
            {
                viewSummary &&
                <div
                    className='absolute top-1/2 -translate-y-1/2 right-4 flex bg-[#005B86] text-[#FFFFFF] px-3 py-1 rounded-3xl justify-center gap-1 cursor-pointer hover:bg-[#D3D3D3] hover:text-[#005B86]'>
                    <List size={26} />
                    <span className='select-none'>
                        View Summary
                    </span>
                </div>
            }
        </div>
    )
}
