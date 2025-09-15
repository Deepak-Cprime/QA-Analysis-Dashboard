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

    useEffect(() => {
        // Load dashboard data directly
        invoke('getDashboardData').then(setDashboardData).catch(() => {
            setDashboardData({
                kpi1: { name: "Average QA scores", value: "8.6" },
                kpi2: { name: "Error rates", value: "15%" },
                kpi3: { 
                    name: "Pillar wise performance", 
                    value: "Good",
                    pillars: {
                        empathy: 8.2,
                        clarity: 7.8,
                        professionalism: 9.1,
                        completeness: 8.5,
                        accuracy: 8.9,
                        efficiency: 7.6,
                        resolutionQuality: 8.7
                    }
                },
                kpi4: { name: "FCR", value: "70%" },
                kpi5: { name: "Performance after coaching", value: "+50%" },
                kpi6: { name: "Average ticket handling time", value: "11 min" }
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading || !dashboardData) {
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
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                maxWidth: '1200px'
            }}>
                <KPICard 
                    title={dashboardData.kpi1.name}
                    value={dashboardData.kpi1.value}
                />
                <KPICard 
                    title={dashboardData.kpi2.name}
                    value={dashboardData.kpi2.value}
                />
                <PillarPerformanceCard 
                    title={dashboardData.kpi3.name}
                    value={dashboardData.kpi3.value}
                    pillars={dashboardData.kpi3.pillars}
                    isExpanded={isPillarsExpanded}
                    onToggle={() => setIsPillarsExpanded(!isPillarsExpanded)}
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
        </div>
    );
}

export default App;
