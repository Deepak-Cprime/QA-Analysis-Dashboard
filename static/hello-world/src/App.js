import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import {
    KPICard,
    PillarPerformanceCard,
    TabNavigation,
    SearchAndFilters,
    AgentCard,
    Pagination
} from './components';

function App() {
    const [dashboardData, setDashboardData] = useState(null);
    const [agentData, setAgentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAgentDataLoading, setIsAgentDataLoading] = useState(false);
    const [isPillarsExpanded, setIsPillarsExpanded] = useState(false);
    const [accessError, setAccessError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedAgents, setExpandedAgents] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterBy, setFilterBy] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const toggleAgentExpansion = (agentId) => {
        setExpandedAgents(prev => ({
            ...prev,
            [agentId]: !prev[agentId]
        }));
    };

    const formatMetricValue = (key, value) => {
        switch (key) {
            case 'errorRate':
                return `${value}%`;
            case 'fcr':
                return `${value}%`;
            case 'avgTicketTime':
                return `${value} min`;
            case 'postCoachingImprovement':
                return `+${value}%`;
            case 'customerSatisfactionScore':
                return `${value}/5`;
            default:
                return value;
        }
    };

    const loadAgentData = async () => {
        if (agentData) return; // Don't reload if already loaded

        setIsAgentDataLoading(true);
        try {
            const data = await invoke('getAgentData');
            setAgentData(data);
        } catch (error) {
            console.error('Error loading agent data:', error);
            if (error.message && error.message.includes('ACCESS_DENIED')) {
                setAccessError("You are not a QA Manager. No access to agent data.");
            } else {
                setAccessError("Unable to load agent data. Please try again.");
            }
        } finally {
            setIsAgentDataLoading(false);
        }
    };

    // Filter and sort agents
    const getFilteredAndSortedAgents = () => {
        if (!agentData || !agentData.agents) return [];

        let filtered = agentData.agents.filter(agent => {
            // Search filter
            const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Performance filter
            let matchesFilter = true;
            switch (filterBy) {
                case 'high':
                    matchesFilter = agent.overallScore >= 8.5;
                    break;
                case 'medium':
                    matchesFilter = agent.overallScore >= 7.0 && agent.overallScore < 8.5;
                    break;
                case 'low':
                    matchesFilter = agent.overallScore < 7.0;
                    break;
                default:
                    matchesFilter = true;
            }

            return matchesSearch && matchesFilter;
        });

        // Sort agents
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'overallScore':
                    return b.overallScore - a.overallScore; // Descending
                case 'errorRate':
                    return a.metrics.errorRate - b.metrics.errorRate; // Ascending (lower is better)
                case 'fcr':
                    return b.metrics.fcr - a.metrics.fcr; // Descending (higher is better)
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredAgents = getFilteredAndSortedAgents();
    const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
    const paginatedAgents = filteredAgents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to first page when filters change
    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    const handleFilterChange = (value) => {
        setFilterBy(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const data = await invoke('getDashboardData');
                setDashboardData(data);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                if (error.message && error.message.includes('ACCESS_DENIED')) {
                    setAccessError("You are not a QA Manager. No access to this dashboard.");
                } else {
                    setAccessError("Unable to load dashboard data. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666'
            }}>
                <h2>QA Dashboard</h2>
                <p>Loading...</p>
            </div>
        );
    }

    // Show error message if access denied or other error
    if (accessError) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                minHeight: '100vh'
            }}>
                <h2 style={{ color: '#d32f2f', marginBottom: '20px' }}>Access Denied</h2>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    {accessError}
                </p>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666'
            }}>
                <h2>QA Dashboard</h2>
                <p>No data available...</p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '24px',
                marginTop: '0'
            }}>QA Dashboard</h1>

            <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onAgentsTabClick={loadAgentData}
            />

            {activeTab === 'overview' && (
                <>
                    {/* First Row - Regular KPI Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                        maxWidth: '1200px',
                        marginBottom: '20px'
                    }}>
                        <KPICard
                            title={dashboardData.kpi1.name}
                            value={dashboardData.kpi1.value}
                        />
                        <KPICard
                            title={dashboardData.kpi2.name}
                            value={dashboardData.kpi2.value}
                        />
                        <KPICard
                            title={dashboardData.kpi4.name}
                            value={dashboardData.kpi4.value}
                        />
                        <KPICard
                            title={dashboardData.kpi5.name}
                            value={dashboardData.kpi5.value}
                        />
                        <KPICard
                            title={dashboardData.kpi6.name}
                            value={dashboardData.kpi6.value}
                        />
                        <KPICard
                            title={dashboardData.kpi7.name}
                            value={dashboardData.kpi7.value}
                        />
                    </div>

                    {/* Second Row - Dropdown Containing Card */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                        maxWidth: '1200px'
                    }}>
                        <PillarPerformanceCard
                            title={dashboardData.kpi3.name}
                            value={dashboardData.kpi3.value}
                            pillars={dashboardData.kpi3.pillars}
                            isExpanded={isPillarsExpanded}
                            onToggle={() => setIsPillarsExpanded(!isPillarsExpanded)}
                        />
                    </div>
                </>
            )}

            {activeTab === 'agents' && (
                <div style={{
                    maxWidth: '1200px'
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '20px'
                    }}>Agent Performance Metrics</h2>

                    {isAgentDataLoading && (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: '#666'
                        }}>
                            <p>Loading agent data...</p>
                        </div>
                    )}

                    {!isAgentDataLoading && agentData && agentData.agents && (
                        <>
                            <SearchAndFilters
                                searchTerm={searchTerm}
                                onSearchChange={handleSearchChange}
                                sortBy={sortBy}
                                onSortChange={handleSortChange}
                                filterBy={filterBy}
                                onFilterChange={handleFilterChange}
                                totalAgents={agentData.totalCount}
                            />

                            <div style={{
                                marginBottom: '20px',
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                Last updated: {new Date(agentData.lastUpdated).toLocaleString()}
                            </div>

                            {filteredAgents.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <p style={{ color: '#666' }}>
                                        No agents found matching your search and filter criteria.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {paginatedAgents.map(agent => (
                                        <AgentCard
                                            key={agent.id}
                                            agent={{
                                                ...agent,
                                                overallScore: agent.overallScore.toString(),
                                                metrics: {
                                                    ...Object.fromEntries(
                                                        Object.entries(agent.metrics).map(([key, value]) => [
                                                            key,
                                                            formatMetricValue(key, value)
                                                        ])
                                                    )
                                                }
                                            }}
                                            isExpanded={expandedAgents[agent.id]}
                                            onToggle={() => toggleAgentExpansion(agent.id)}
                                        />
                                    ))}

                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                            itemsPerPage={itemsPerPage}
                                            totalItems={agentData.totalCount}
                                            filteredItems={filteredAgents.length}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {!isAgentDataLoading && !agentData && (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <p style={{ color: '#666', marginBottom: '16px' }}>
                                Agent data not loaded yet.
                            </p>
                            <button
                                onClick={loadAgentData}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#0066cc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Load Agent Data
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;