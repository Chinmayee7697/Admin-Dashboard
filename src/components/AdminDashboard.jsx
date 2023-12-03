import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from './Toolbar';
import TableRow from './TableRow';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

const AdminDashboard = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [checkedRows, setCheckedRows] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(apiUrl);
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchKeyword(keyword);
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(keyword) ||
                row.email.toLowerCase().includes(keyword) ||
                row.role.toLowerCase().includes(keyword)
        );
        setFilteredRows(filtered);
    };

    const handleDeleteClick = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleDeleteSelectedRows = () => {
        setRows(rows.filter((row) => !checkedRows.includes(row.id)));
        setCheckedRows([]);
    };

    const handleCheckboxChange = (id) => {
        if (checkedRows.includes(id)) {
            setCheckedRows(checkedRows.filter((checkedId) => checkedId !== id));
        } else {
            setCheckedRows([...checkedRows, id]);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    return (
        <div className="App">
            <h1 className="title">Admin Dashboard</h1>
            <Toolbar handleDeleteSelectedRows={handleDeleteSelectedRows} />
            {rows.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr className="tableHead">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row) => (
                                <TableRow key={row.id} row={row} onDeleteClick={handleDeleteClick} onCheckboxChange={handleCheckboxChange} />
                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
