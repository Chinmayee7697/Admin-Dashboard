import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="arrows">
                {'<'} 
            </button>
            {pageNumbers}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="arrows">
                 {'>'}
            </button>
        </div>
    );
};

export default Pagination;
