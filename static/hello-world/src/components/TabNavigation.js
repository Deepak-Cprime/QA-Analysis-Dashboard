import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, onAgentsTabClick }) => (
    <div style={{
        display: 'flex',
        marginBottom: '24px',
        borderBottom: '1px solid #ddd'
    }}>
        <button
            onClick={() => onTabChange('overview')}
            style={{
                background: 'none',
                border: 'none',
                padding: '12px 24px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
                color: activeTab === 'overview' ? '#0066cc' : '#666',
                borderBottom: activeTab === 'overview' ? '2px solid #0066cc' : '2px solid transparent',
                transition: 'all 0.2s ease'
            }}
        >
            Overview
        </button>
        <button
            onClick={() => {
                onTabChange('agents');
                onAgentsTabClick();
            }}
            style={{
                background: 'none',
                border: 'none',
                padding: '12px 24px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === 'agents' ? 'bold' : 'normal',
                color: activeTab === 'agents' ? '#0066cc' : '#666',
                borderBottom: activeTab === 'agents' ? '2px solid #0066cc' : '2px solid transparent',
                transition: 'all 0.2s ease'
            }}
        >
            Agents
        </button>
    </div>
);

export default TabNavigation;