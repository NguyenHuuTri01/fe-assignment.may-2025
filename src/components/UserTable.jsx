import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const UserTable = (props) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [selectedAll, setSelectedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    // get data
    useEffect(() => {
        getUserData();
    }, [props.users, props.totalUsers]);

    const getUserData = () => {
        const initializedUsers = (props.users || []).map(user => ({
            ...user,
            checked: false,
        }));
        setUsers(initializedUsers);
        setTotalUsers(props.totalUsers || 0);
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pagedUsers = users.slice(startIdx, endIdx);

    const toggleAll = () => {
        const newValue = !selectedAll;
        const updatedUsers = users.map((user, index) => {
            const isInPage = index >= startIdx && index < endIdx;
            if (isInPage) {
                return { ...user, checked: newValue };
            }
            return user;
        });

        setUsers(updatedUsers);
        setSelectedAll(newValue);
    };

    const toggleItem = (userId) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, checked: !user.checked } : user
        );
        setUsers(updatedUsers);
        const pagedChecked = updatedUsers.slice(startIdx, endIdx).every(user => user.checked);
        setSelectedAll(pagedChecked);
    };

    // pagination
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(1);
    };

    const handleRefreshData = () => {
        getUserData()
    }

    const getPaginationRange = () => {
        const totalPageNumbers = 5;
        const dots = '...';

        if (totalPages <= totalPageNumbers) {
            return [...Array(totalPages)].map((_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPages - 1;

        const firstPage = 1;
        const lastPage = totalPages;

        if (!showLeftDots && showRightDots) {
            return [1, 2, 3, dots, totalPages];
        }

        if (showLeftDots && !showRightDots) {
            return [firstPage, dots, totalPages - 2, totalPages - 1, totalPages];
        }

        if (showLeftDots && showRightDots) {
            return [firstPage, dots, currentPage - 1, currentPage, currentPage + 1, dots, lastPage];
        }
    }

    return (
        <div className="flex flex-col h-full border rounded-md">
            <div className="flex items-center p-4 border-b gap-2">
                <h2 className="text-lg font-semibold text-blue-900">{totalUsers} USERS</h2>
                <RotateCcw onClick={() => handleRefreshData()} className="text-blue-900 cursor-pointer" size={20} />
            </div>

            <div className="flex-1 overflow-auto max-h-[540px]">
                <Table>
                    <TableHeader className="bg-[#DAE6EF]">
                        <TableRow>
                            <TableHead className="w-4">
                                <Checkbox
                                    checked={selectedAll}
                                    onCheckedChange={toggleAll}
                                    className="border border-gray-400"
                                />
                            </TableHead>
                            <TableHead>User Name<br /><span className="text-xs font-normal text-gray-500">User ID</span></TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagedUsers.map((user, index) => (
                            <TableRow
                                key={`${index.id}-${index}`}
                                className={`hover:bg-[#D3D3D3] transition-colors ${checkedItems[user.id] ? 'bg-[#D3D3D3]' : ''}`}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={!!user.checked}
                                        onCheckedChange={() => toggleItem(user.id)}
                                        className="border border-gray-400"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.id}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.phone}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>{user.experience}</TableCell>
                                <TableCell>
                                    <span className="text-green-600 text-xs font-semibold px-2 py-1">
                                        {user.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="border-t p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button size="icon" variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <ChevronLeft size={16} />
                        </Button>

                        {getPaginationRange().map((page, index) => (
                            <Button
                                key={`p-${index}`}
                                size="icon"
                                variant={currentPage === page ? "outline" : "ghost"}
                                className={currentPage === page ? "bg-blue-100 border-blue-300" : ""}
                                onClick={() => typeof page === "number" && handlePageChange(page)}
                                disabled={page === '...'}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button size="icon" variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                    <div>
                        <select
                            className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value={5}>05 items</option>
                            <option value={10}>10 items</option>
                            <option value={15}>15 items</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
