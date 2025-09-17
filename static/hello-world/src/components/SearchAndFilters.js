import React from 'react';

const SearchAndFilters = ({ searchTerm, onSearchChange, sortBy, onSortChange, filterBy, onFilterChange, totalAgents }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
    }}>
        <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'flex-end'
        }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '6px',
                    fontWeight: '500'
                }}>
                    Search Agents
                </label>
                <input
                    type="text"
                    placeholder="Search agents by name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
            <div style={{ minWidth: '150px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '6px',
                    fontWeight: '500'
                }}>
                    Sort By
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                    }}
                >
                    <option value="name">Name</option>
                    <option value="overallScore">Overall Score</option>
                    <option value="errorRate">Error Rate</option>
                    <option value="fcr">FCR</option>
                </select>
            </div>
            <div style={{ minWidth: '200px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '6px',
                    fontWeight: '500'
                }}>
                    Filter
                </label>
                <select
                    value={filterBy}
                    onChange={(e) => onFilterChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                    }}
                >
                    <option value="all">All Agents ({totalAgents})</option>
                    <option value="high">High Performers (8.5+)</option>
                    <option value="medium">Medium Performers (7.0-8.5)</option>
                    <option value="low">Low Performers (&lt;7.0)</option>
                </select>
            </div>
        </div>
    </div>
);

export default SearchAndFilters;