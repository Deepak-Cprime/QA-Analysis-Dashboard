import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems, filteredItems }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
            Showing {Math.min(((currentPage - 1) * itemsPerPage) + 1, filteredItems)} - {Math.min(currentPage * itemsPerPage, filteredItems)} of {filteredItems} agents
            {filteredItems !== totalItems && ` (filtered from ${totalItems} total)`}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
                    color: currentPage === 1 ? '#999' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>
            <span style={{ margin: '0 16px', fontSize: '14px', color: '#666' }}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
                    color: currentPage === totalPages ? '#999' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
            >
                Next
            </button>
        </div>
    </div>
);

export default Pagination;