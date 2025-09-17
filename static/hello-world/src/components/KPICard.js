import React from 'react';

const KPICard = ({ title, value }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '200px'
    }}>
        <h3 style={{
            color: '#666',
            fontSize: '14px',
            fontWeight: '500',
            margin: '0 0 10px 0'
        }}>{title}</h3>
        <div style={{
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0
        }}>{value}</div>
    </div>
);

export default KPICard;