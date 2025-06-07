import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../reducers/tableSlice';
import Papa from 'papaparse';
import { ChevronDown, ChevronUp } from "lucide-react";

function Inquiries() {
    const dispatch = useDispatch();
    const storedState = useSelector((state) => state.inquiries);

    const [jsonData, setJsonData] = useState([]);
    const [sortBy, setSortBy] = useState(storedState.sortBy);
    const [sortOrder, setSortOrder] = useState(storedState.sortOrder);
    const [filters, setFilters] = useState(storedState.filters || {});
    const [currentPage, setCurrentPage] = useState(storedState.currentPage);
    const [pageSize, setPageSize] = useState(storedState.pageSize);

    useEffect(() => {
        fetch('/customers100.csv')
            .then((res) => res.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        setJsonData(result.data);
                    },
                });
            });
    }, []);

    const handleSort = (field) => {
        const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(newSortOrder);
        dispatch(updateState({ sortBy: field, sortOrder: newSortOrder }));
    };

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        setCurrentPage(1);
        dispatch(updateState({ filters: newFilters, currentPage: 1 }));
    };

    const filteredData = useMemo(() => {
        return jsonData.filter((row) => {
            return Object.entries(filters).every(([key, val]) => {
                return !val || String(row[key] || '').toLowerCase().includes(val.toLowerCase());
            });
        });
    }, [jsonData, filters]);

    const sortedData = useMemo(() => {
        if (!sortBy) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValRaw = a[sortBy] ?? '';
            const bValRaw = b[sortBy] ?? '';

            const aNum = parseFloat(aValRaw);
            const bNum = parseFloat(bValRaw);

            const isNumeric = !isNaN(aNum) && !isNaN(bNum);

            const aVal = isNumeric ? aNum : aValRaw.toLowerCase();
            const bVal = isNumeric ? bNum : bValRaw.toLowerCase();

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortBy, sortOrder]);

    const pageCount = Math.ceil(sortedData.length / pageSize);
    const currentPageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const headers = jsonData[0] ? Object.keys(jsonData[0]) : [];

    const getPaginationItems = () => {
        const pages = [];
        const showLeftEllipsis = currentPage > 3;
        const showRightEllipsis = currentPage < pageCount - 2;

        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(pageCount, currentPage + 1);

        if (showLeftEllipsis) pages.push(1);
        if (showLeftEllipsis && startPage > 2) pages.push('...');

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (showRightEllipsis && endPage < pageCount - 1) pages.push('...');
        if (showRightEllipsis) pages.push(pageCount);

        return [...new Set(pages)];
    };


    return (
        <div className="p-4 space-y-4 w-[1270px]">
            <h2 className="text-xl font-semibold">Dữ liệu từ file CSV</h2>

            <div className="overflow-auto h-[520px]">
                <table className="border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {headers.map((key) => (
                                <th
                                    key={key}
                                    onClick={() => handleSort(key)}
                                    className="cursor-pointer text-[14px] px-2 py-2 border border-gray-300 text-left"
                                >
                                    <div className='flex'>
                                        {key}
                                        {sortBy === key ? (sortOrder === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ''}
                                    </div>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            {headers.map((key) => (
                                <th key={key} className="px-2 py-1 border border-gray-300">
                                    <input
                                        type="text"
                                        placeholder="Lọc..."
                                        className="w-full px-1 py-0.5 border rounded text-sm"
                                        value={filters[key] || ''}
                                        onChange={(e) => handleFilterChange(key, e.target.value)}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {headers.map((key) => (
                                    <td key={key} className="px-4 py-2 border border-gray-200 text-sm">
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
                <div className="text-sm text-gray-600">
                    Trang {currentPage} / {pageCount} — Tổng {filteredData.length} dòng
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm">Số dòng mỗi trang:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPageSize(newSize);
                            setCurrentPage(1);
                            dispatch(updateState({ pageSize: newSize, currentPage: 1 }));
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-1">
                        {getPaginationItems().map((page, idx) => (
                            <button
                                key={idx}
                                disabled={page === '...'}
                                onClick={() => {
                                    if (typeof page === 'number') {
                                        setCurrentPage(page);
                                        dispatch(updateState({ currentPage: page }));
                                    }
                                }}
                                className={`px-2 py-1 border rounded text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white'
                                    } ${page === '...' ? 'cursor-default opacity-50' : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inquiries;
