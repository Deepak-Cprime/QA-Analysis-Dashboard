import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';

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
                            textTransform: 'capitalize'
                        }}>
                            {key === 'resolutionQuality' ? 'Resolution Quality' : key}
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



function App() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPillarsExpanded, setIsPillarsExpanded] = useState(false);
    const [accessError, setAccessError] = useState(null);

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
        </div>
    );
}

export default App;
