import React from 'react';

const AgentCard = ({ agent, isExpanded, onToggle }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '16px'
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
        }} onClick={onToggle}>
            <div>
                <h3 style={{
                    color: '#333',
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 4px 0'
                }}>{agent.name}</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        margin: '0'
                    }}>Overall Score: <strong style={{
                        color: parseFloat(agent.overallScore) >= 8.5 ? '#28a745' :
                               parseFloat(agent.overallScore) >= 7.0 ? '#ffc107' : '#dc3545'
                    }}>{agent.overallScore}</strong></p>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        margin: '0'
                    }}>FCR: <strong>{agent.metrics.fcr}</strong></p>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        margin: '0'
                    }}>Error Rate: <strong>{agent.metrics.errorRate}</strong></p>
                </div>
            </div>
            <button style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#666'
            }}>
                {isExpanded ? '▲ Hide Metrics' : '▼ Show Metrics'}
            </button>
        </div>
        {isExpanded && (
            <div style={{
                borderTop: '1px solid #eee',
                paddingTop: '16px',
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
            }}>
                {Object.entries(agent.metrics).map(([key, value]) => (
                    <div key={key} style={{
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        border: '1px solid #e0e0e0'
                    }}>
                        <div style={{
                            color: '#666',
                            fontSize: '12px',
                            fontWeight: '500',
                            marginBottom: '4px',
                            textTransform: 'capitalize'
                        }}>
                            {key === 'resolutionQuality' ? 'Resolution Quality' :
                             key === 'avgTicketTime' ? 'Avg Ticket Time' :
                             key === 'errorRate' ? 'Error Rate' :
                             key === 'fcr' ? 'FCR' :
                             key === 'postCoachingImprovement' ? 'Post Coaching Improvement' : key}
                        </div>
                        <div style={{
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>{value}</div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default AgentCard;