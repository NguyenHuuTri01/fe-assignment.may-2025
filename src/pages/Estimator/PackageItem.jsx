import { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";

const PackageItem = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(props.data ? props.data : {})
    }, [])

    console.log(props)

    return (
        <div className="p-3">
            <div className="flex justify-between mb-3">
                <label className="text-[18px] font-[500] text-[#000000]">
                    {data.Title ? data.Title : ""}
                </label>
                <ChevronRight />
            </div>
            <div className="line-clamp-2 text-[14px] font-[400] text-[#7C7C7C]">
                {data.Description ? data.Description : ""}
            </div>
            <div className="flex my-5 gap-2">
                <span className="border-2 border-[#D3D3D3] bg-[#E2F5F9] text-[#7C7C7C]">
                    <ChevronRight />
                </span>
                <span className="border-2 border-[#D3D3D3] bg-[#E2F5F9] text-[#7C7C7C]">
                    <ChevronRight />
                </span>
            </div>
            <div className="flex text-[16px] font-[500] text-[#005B86] justify-between">
                <label className="">View Detail</label>
                <ShoppingCart />
            </div>
        </div>
    );
}

export default PackageItem;