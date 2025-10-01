import React from 'react';

const PillarPerformanceCard = ({ title, value, pillars, isExpanded, onToggle }) => (
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
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px'
        }}>
            <div style={{
                color: '#333',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>{value}</div>
            <button
                onClick={onToggle}
                style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#666'
                }}
            >
                {isExpanded ? '▲ Hide' : '▼ Show Details'}
            </button>
        </div>
        {isExpanded && (
            <div style={{
                borderTop: '1px solid #eee',
                paddingTop: '15px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '8px'
            }}>
                {Object.entries(pillars).map(([key, value]) => (
                    <div key={key} style={{
                        padding: '8px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '12px'
                    }}>
                        <div style={{
                            color: '#666',
                            marginBottom: '2px',
                            lineHeight: '1.3'
                        }}>
                            {key === 'empathy' ? 'Empathy' :
                             key === 'clarity' ? 'Clarity' :
                             key === 'completeness' ? 'Completeness' :
                             key === 'professionalism' ? 'Professionalism' :
                             key === 'ticketManagement' ? 'Ticket Management' :
                             key === 'slaFirstResponse' ? 'SLA to first response' :
                             key === 'slaResolution' ? 'SLA to resolution' :
                             key}
                        </div>
                        <div style={{
                            fontWeight: 'bold',
                            color: '#333'
                        }}>{value}</div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default PillarPerformanceCard;