import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    FileText, ExternalLink, LibraryBig, Percent, SquareArrowOutUpRight,
    ClipboardList, Files, ChartSpline, NotebookPen
} from "lucide-react";

const LoanDashboard = () => {
    return (
        <div className="p-6 space-y-4 h-full overflow-auto">
            {/* General Information */}
            <Card>
                <CardContent className="p-1">
                    <h2 className="font-[500] text-[16px] text-[#767676] mb-4 flex gap-2">
                        <LibraryBig />
                        GENERAL INFORMATION
                    </h2>
                    <div className="grid grid-cols-4 gap-4 text-[14px]">
                        <div>
                            <div className="font-[600]">First Name</div>
                            <div className="font-[400]">David</div>
                        </div>
                        <div>
                            <div className="font-[600]">Last Name</div>
                            <div className="font-[400]">Nguyen</div>
                        </div>
                        <div>
                            <div className="font-[600]">Experience</div>
                            <div className="font-[400]">5 years</div>
                        </div>
                        <div>
                            <div className="font-[600] text-[14px]">Personal Website</div>
                            <a href="http://david.com" className="font-[400]">david.com</a>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Commission Structures */}
            <Card>
                <CardContent className="p-1 flex items-center justify-between">
                    <h2 className="font-[500] text-[16px] text-[#767676] flex gap-4">
                        <Percent size={25} />
                        COMMISSION STRUCTURES
                    </h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SquareArrowOutUpRight color="#CFCFCF" />
                        </TooltipTrigger>
                        <TooltipContent>You don’t have permission to open this link</TooltipContent>
                    </Tooltip>
                </CardContent>
            </Card>

            {/* Recruitment Documents */}
            <Card>
                <CardContent className="p-1 flex items-center justify-between">
                    <h2 className="font-[500] text-[16px] flex gap-4 text-[#767676]">
                        <ClipboardList />
                        RECRUITMENT DOCUMENTS
                    </h2>
                    <a>
                        <SquareArrowOutUpRight size={23} color="#2979FF" />
                    </a>
                </CardContent>
            </Card>

            {/* Related Clients & Loan Documents */}
            <Card>
                <CardContent className="p-1">
                    <h2 className="font-[500] text-[16px] text-[#767676] flex gap-4 mb-4">
                        <Files />
                        RELATED CLIENTS & LOAN DOCUMENTS
                    </h2>
                    <table className="w-full border">
                        <thead className="bg-[#DAE6EF] text-left text-[#111928] text-[14px] font-[500]">
                            <tr>
                                <th className="p-1">Index</th>
                                <th className="p-1">Borrower Name<br />Loan ID</th>
                                <th className="p-1">Lender<br />Interest Rate</th>
                                <th className="p-1">Process</th>
                                <th className="p-1">Status</th>
                                <th className="p-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2].map((index) => (
                                <tr key={index} className="border-t text-[14px] font-[400]">
                                    <td className="p-1">0{index}</td>
                                    <td className="p-1">
                                        <div className="font-[500]">Ms. Hang Nguyen</div>
                                        <div className="text-gray-500 text-xs">#LA00001</div>
                                    </td>
                                    <td className="p-1">
                                        <div className="font-[500]">AD Mortgage</div>
                                        <div className="text-gray-500 text-xs">6% (6.168% APR)</div>
                                    </td>
                                    <td className="p-1 h-12 flex gap-2 justify-center items-center">
                                        <div className="w-24 bg-gray-200 h-2 rounded-full">
                                            <div className="h-full bg-blue-500 w-[68%] rounded-full"></div>
                                        </div>
                                        <div className="text-xs text-gray-600">68%</div>
                                    </td>
                                    <td className="p-1">
                                        <span className="bg-[#E6F7FF] text-[#2979FF] px-2 py-0.5 rounded text-xs">IN PROGRESS</span>
                                    </td>
                                    <td className="p-1">
                                        <FileText className="w-4 h-4 text-blue-600 cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Performance */}
            <Card>
                <CardContent className="p-1">
                    <h2 className="font-[500] text-[16px] text-[#767676] flex gap-4">
                        <ChartSpline />
                        PERFORMANCE
                    </h2>
                </CardContent>
            </Card>

            {/* To-Do */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="font-[500] text-[16px] text-[#767676] flex gap-4 mb-3">
                        <NotebookPen />
                        TO-DO
                    </h2>
                    <div className="space-y-2 text-[16px] font-[500]">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="review" className={"border border-gray-400"} />
                            <label htmlFor="review" className="flex items-center gap-1 cursor-pointer">
                                Review Loan Applications
                                <SquareArrowOutUpRight className="w-4 h-4 text-blue-500" />
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="contact" className={"border border-gray-400"} />
                            <label htmlFor="contact" className="flex items-center gap-1 cursor-pointer">
                                Contact to Borrower
                                <SquareArrowOutUpRight className="w-4 h-4 text-blue-500" />
                            </label>
                        </div>
                        <div className="text-gray-400 italic">Click to add new todo</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoanDashboard;