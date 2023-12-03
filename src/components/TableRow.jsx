import React from 'react';

const TableRow = ({ row, onDeleteClick, onCheckboxChange }) => {
    const handleCheckbox = () => {
        onCheckboxChange(row.id);
    };

    return (
        <tr className={`table-row ${row.isSelected ? 'selected' : ''}`}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td>
                <input
                    type="checkbox"
                    checked={row.isSelected}
                    onChange={handleCheckbox}
                />
            </td>
            <td>
                <button onClick={() => onDeleteClick(row.id)}>
                    <i className="fa-solid fa-trash-can" style={{ color: "#fff" }}></i>
                </button>
               
            </td>
        </tr>
    );
};

export default TableRow;
