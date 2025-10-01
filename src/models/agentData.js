/**
 * Agent Data Model
 * Contains agent performance data that will eventually come from external endpoints
 */

export const getAgentsData = () => {
    return [
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.johnson@company.com",
            department: "Customer Support",
            hireDate: "2022-03-15",
            overallScore: 8.4,
            metrics: {
                empathy: 8.2,
                clarity: 7.8,
                completeness: 8.5,
                professionalism: 9.1,
                ticketManagement: 8.3,
                slaFirstResponse: 7.9,
                slaResolution: 8.1,
                errorRate: 12,
                fcr: 75,
                avgTicketTime: 9,
                postCoachingImprovement: 45,
                customerSatisfactionScore: 4.2
            },
            recentPerformance: {
                thisMonth: 8.6,
                lastMonth: 8.2,
                trend: "improving"
            }
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@company.com",
            department: "Technical Support",
            hireDate: "2021-11-20",
            overallScore: 7.9,
            metrics: {
                empathy: 7.5,
                clarity: 8.2,
                completeness: 7.9,
                professionalism: 8.8,
                ticketManagement: 8.0,
                slaFirstResponse: 8.1,
                slaResolution: 7.8,
                errorRate: 18,
                fcr: 68,
                avgTicketTime: 12,
                postCoachingImprovement: 38,
                customerSatisfactionScore: 3.8
            },
            recentPerformance: {
                thisMonth: 8.1,
                lastMonth: 7.7,
                trend: "improving"
            }
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            email: "emily.rodriguez@company.com",
            department: "Customer Support",
            hireDate: "2020-08-10",
            overallScore: 9.1,
            metrics: {
                empathy: 9.3,
                clarity: 8.9,
                completeness: 9.0,
                professionalism: 9.5,
                ticketManagement: 9.2,
                slaFirstResponse: 8.8,
                slaResolution: 9.1,
                errorRate: 8,
                fcr: 82,
                avgTicketTime: 8,
                postCoachingImprovement: 62,
                customerSatisfactionScore: 4.6
            },
            recentPerformance: {
                thisMonth: 9.3,
                lastMonth: 8.9,
                trend: "improving"
            }
        },
        {
            id: 4,
            name: "David Thompson",
            email: "david.thompson@company.com",
            department: "Technical Support",
            hireDate: "2023-01-05",
            overallScore: 8.7,
            metrics: {
                empathy: 8.0,
                clarity: 8.5,
                completeness: 8.8,
                professionalism: 9.0,
                ticketManagement: 8.4,
                slaFirstResponse: 8.2,
                slaResolution: 8.6,
                errorRate: 14,
                fcr: 72,
                avgTicketTime: 10,
                postCoachingImprovement: 52,
                customerSatisfactionScore: 4.1
            },
            recentPerformance: {
                thisMonth: 8.9,
                lastMonth: 8.5,
                trend: "improving"
            }
        },
        {
            id: 5,
            name: "Lisa Wang",
            email: "lisa.wang@company.com",
            department: "Customer Support",
            hireDate: "2022-09-12",
            overallScore: 8.2,
            metrics: {
                empathy: 8.7,
                clarity: 7.9,
                completeness: 8.1,
                professionalism: 8.6,
                ticketManagement: 8.0,
                slaFirstResponse: 7.8,
                slaResolution: 8.3,
                errorRate: 16,
                fcr: 69,
                avgTicketTime: 13,
                postCoachingImprovement: 41,
                customerSatisfactionScore: 3.9
            },
            recentPerformance: {
                thisMonth: 8.4,
                lastMonth: 8.0,
                trend: "improving"
            }
        },
        {
            id: 6,
            name: "James Mitchell",
            email: "james.mitchell@company.com",
            department: "Technical Support",
            hireDate: "2021-07-18",
            overallScore: 7.3,
            metrics: {
                empathy: 7.0,
                clarity: 7.5,
                completeness: 7.1,
                professionalism: 8.2,
                ticketManagement: 7.3,
                slaFirstResponse: 6.9,
                slaResolution: 7.4,
                errorRate: 22,
                fcr: 62,
                avgTicketTime: 15,
                postCoachingImprovement: 28,
                customerSatisfactionScore: 3.4
            },
            recentPerformance: {
                thisMonth: 7.5,
                lastMonth: 7.1,
                trend: "improving"
            }
        },
        {
            id: 7,
            name: "Amanda Foster",
            email: "amanda.foster@company.com",
            department: "Customer Support",
            hireDate: "2023-04-22",
            overallScore: 8.9,
            metrics: {
                empathy: 9.1,
                clarity: 8.7,
                completeness: 8.8,
                professionalism: 9.2,
                ticketManagement: 8.9,
                slaFirstResponse: 8.6,
                slaResolution: 9.0,
                errorRate: 10,
                fcr: 78,
                avgTicketTime: 9,
                postCoachingImprovement: 55,
                customerSatisfactionScore: 4.4
            },
            recentPerformance: {
                thisMonth: 9.1,
                lastMonth: 8.7,
                trend: "improving"
            }
        },
        {
            id: 8,
            name: "Robert Kim",
            email: "robert.kim@company.com",
            department: "Technical Support",
            hireDate: "2020-12-03",
            overallScore: 6.8,
            metrics: {
                empathy: 6.5,
                clarity: 7.1,
                completeness: 6.9,
                professionalism: 7.8,
                ticketManagement: 6.8,
                slaFirstResponse: 6.2,
                slaResolution: 6.7,
                errorRate: 28,
                fcr: 55,
                avgTicketTime: 18,
                postCoachingImprovement: 22,
                customerSatisfactionScore: 3.1
            },
            recentPerformance: {
                thisMonth: 6.9,
                lastMonth: 6.7,
                trend: "stable"
            }
        },
        {
            id: 9,
            name: "Jessica Martinez",
            email: "jessica.martinez@company.com",
            department: "Customer Support",
            hireDate: "2022-01-10",
            overallScore: 8.6,
            metrics: {
                empathy: 8.8,
                clarity: 8.4,
                completeness: 8.7,
                professionalism: 8.9,
                ticketManagement: 8.5,
                slaFirstResponse: 8.2,
                slaResolution: 8.6,
                errorRate: 13,
                fcr: 74,
                avgTicketTime: 11,
                postCoachingImprovement: 48,
                customerSatisfactionScore: 4.3
            },
            recentPerformance: {
                thisMonth: 8.8,
                lastMonth: 8.4,
                trend: "improving"
            }
        },
        {
            id: 10,
            name: "Christopher Lee",
            email: "christopher.lee@company.com",
            department: "Technical Support",
            hireDate: "2021-05-14",
            overallScore: 7.7,
            metrics: {
                empathy: 7.4,
                clarity: 7.9,
                completeness: 7.6,
                professionalism: 8.1,
                ticketManagement: 7.5,
                slaFirstResponse: 7.3,
                slaResolution: 7.7,
                errorRate: 19,
                fcr: 65,
                avgTicketTime: 14,
                postCoachingImprovement: 35,
                customerSatisfactionScore: 3.7
            },
            recentPerformance: {
                thisMonth: 7.9,
                lastMonth: 7.5,
                trend: "improving"
            }
        },
        {
            id: 11,
            name: "Alex Johnson",
            email: "alex.johnson@company.com",
            department: "Customer Support",
            hireDate: "2023-08-15",
            overallScore: 8.5,
            metrics: {
                empathy: 8.4,
                clarity: 8.6,
                completeness: 8.3,
                professionalism: 8.8,
                ticketManagement: 8.5,
                slaFirstResponse: 8.2,
                slaResolution: 8.7,
                errorRate: 11,
                fcr: 76,
                avgTicketTime: 10,
                postCoachingImprovement: 50,
                customerSatisfactionScore: 4.3
            },
            recentPerformance: {
                thisMonth: 8.7,
                lastMonth: 8.3,
                trend: "improving"
            }
        }
    ];
};

/**
 * Agent data schema for validation
 */
export const agentSchema = {
    id: Number,
    name: String,
    email: String,
    department: String,
    hireDate: String,
    overallScore: Number,
    metrics: {
        empathy: Number,
        clarity: Number,
        completeness: Number,
        professionalism: Number,
        ticketManagement: Number,
        slaFirstResponse: Number,
        slaResolution: Number,
        errorRate: Number,
        fcr: Number,
        avgTicketTime: Number,
        postCoachingImprovement: Number,
        customerSatisfactionScore: Number
    },
    recentPerformance: {
        thisMonth: Number,
        lastMonth: Number,
        trend: String
    }
};

/**
 * Get agent data with metadata
 */
export const getAgentDataWithMeta = () => {
    const agents = getAgentsData();
    return {
        agents: agents,
        totalCount: agents.length,
        lastUpdated: new Date().toISOString()
    };
};