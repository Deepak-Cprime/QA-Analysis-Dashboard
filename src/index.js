import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});

resolver.define('getDashboardData', async (req) => {
    try {
        console.log('Dashboard data requested for user:', req.context.accountId);

        // Check if user has QA Manager role
        const projectKey = 'QB';
        const roleId = '10105'; // QA Manager role ID

        const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectKey}/role/${roleId}`);

        if (response.status === 200) {
            const roleData = await response.json();
            const userAccountId = req.context.accountId;

            // Check if current user is in the QA Manager role actors
            const hasQAManagerRole = roleData.actors.some(actor =>
                actor.actorUser && actor.actorUser.accountId === userAccountId
            );

            if (!hasQAManagerRole) {
                console.log('Access denied: User not in QA Manager role');
                throw new Error('ACCESS_DENIED: You are not a QA Manager. No access to this dashboard.');
            }

            console.log('Access granted: User has QA Manager role');

            return {
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
            };
        } else {
            console.error('Role verification failed with status:', response.status);
            throw new Error(`Unable to verify user role - API returned ${response.status}`);
        }

    } catch (error) {
        console.error('Error in getDashboardData:', error.message);

        if (error.message.includes('ACCESS_DENIED')) {
            throw error; // Re-throw access denied errors
        }

        throw new Error('Unable to load dashboard data');
    }
});

resolver.define('getAgentData', async (req) => {
    try {
        console.log('Agent data requested for user:', req.context.accountId);

        // Check if user has QA Manager role (same as dashboard data)
        const projectKey = 'QB';
        const roleId = '10105'; // QA Manager role ID

        const response = await api.asUser().requestJira(route`/rest/api/3/project/${projectKey}/role/${roleId}`);

        if (response.status === 200) {
            const roleData = await response.json();
            const userAccountId = req.context.accountId;

            // Check if current user is in the QA Manager role actors
            const hasQAManagerRole = roleData.actors.some(actor =>
                actor.actorUser && actor.actorUser.accountId === userAccountId
            );

            if (!hasQAManagerRole) {
                console.log('Access denied: User not in QA Manager role');
                throw new Error('ACCESS_DENIED: You are not a QA Manager. No access to agent data.');
            }

            console.log('Access granted: User has QA Manager role for agent data');

            // Agent data - inline for Forge compatibility
            const agentData = [
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
                        professionalism: 9.1,
                        completeness: 8.5,
                        accuracy: 8.9,
                        efficiency: 7.6,
                        resolutionQuality: 8.7,
                        errorRate: 12,
                        fcr: 75,
                        avgTicketTime: 9,
                        postCoachingImprovement: 45
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
                        professionalism: 8.8,
                        completeness: 7.9,
                        accuracy: 8.1,
                        efficiency: 8.3,
                        resolutionQuality: 8.0,
                        errorRate: 18,
                        fcr: 68,
                        avgTicketTime: 12,
                        postCoachingImprovement: 38
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
                        professionalism: 9.5,
                        completeness: 9.0,
                        accuracy: 9.2,
                        efficiency: 8.8,
                        resolutionQuality: 9.1,
                        errorRate: 8,
                        fcr: 82,
                        avgTicketTime: 8,
                        postCoachingImprovement: 62
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
                        professionalism: 9.0,
                        completeness: 8.8,
                        accuracy: 8.9,
                        efficiency: 8.4,
                        resolutionQuality: 8.6,
                        errorRate: 14,
                        fcr: 72,
                        avgTicketTime: 10,
                        postCoachingImprovement: 52
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
                        professionalism: 8.6,
                        completeness: 8.1,
                        accuracy: 8.3,
                        efficiency: 7.8,
                        resolutionQuality: 8.4,
                        errorRate: 16,
                        fcr: 69,
                        avgTicketTime: 13,
                        postCoachingImprovement: 41
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
                        professionalism: 8.2,
                        completeness: 7.1,
                        accuracy: 7.8,
                        efficiency: 6.9,
                        resolutionQuality: 7.4,
                        errorRate: 22,
                        fcr: 62,
                        avgTicketTime: 15,
                        postCoachingImprovement: 28
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
                        professionalism: 9.2,
                        completeness: 8.8,
                        accuracy: 8.9,
                        efficiency: 8.6,
                        resolutionQuality: 9.0,
                        errorRate: 10,
                        fcr: 78,
                        avgTicketTime: 9,
                        postCoachingImprovement: 55
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
                        professionalism: 7.8,
                        completeness: 6.9,
                        accuracy: 7.0,
                        efficiency: 6.2,
                        resolutionQuality: 6.7,
                        errorRate: 28,
                        fcr: 55,
                        avgTicketTime: 18,
                        postCoachingImprovement: 22
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
                        professionalism: 8.9,
                        completeness: 8.7,
                        accuracy: 8.5,
                        efficiency: 8.2,
                        resolutionQuality: 8.6,
                        errorRate: 13,
                        fcr: 74,
                        avgTicketTime: 11,
                        postCoachingImprovement: 48
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
                        professionalism: 8.1,
                        completeness: 7.6,
                        accuracy: 7.8,
                        efficiency: 7.5,
                        resolutionQuality: 7.7,
                        errorRate: 19,
                        fcr: 65,
                        avgTicketTime: 14,
                        postCoachingImprovement: 35
                    },
                    recentPerformance: {
                        thisMonth: 7.9,
                        lastMonth: 7.5,
                        trend: "improving"
                    }
                }
            ];

            return {
                agents: agentData,
                totalCount: agentData.length,
                lastUpdated: new Date().toISOString()
            };
        } else {
            console.error('Role verification failed with status:', response.status);
            throw new Error(`Unable to verify user role - API returned ${response.status}`);
        }

    } catch (error) {
        console.error('Error in getAgentData:', error.message);

        if (error.message.includes('ACCESS_DENIED')) {
            throw error; // Re-throw access denied errors
        }

        throw new Error('Unable to load agent data');
    }
});

resolver.define('checkUserAccess', async (req) => {
    try {
        console.log('Checking user access...');

        // Get current user with groups expanded (recommended approach)
        const userResponse = await api.asUser().requestJira(route`/rest/api/2/user?accountId=${req.context.accountId}&expand=groups`);
        const user = await userResponse.json();

        console.log('Current user:', {
            displayName: user.displayName,
            emailAddress: user.emailAddress,
            accountId: user.accountId
        });

        console.log('User groups from expand:', user.groups);

        // Alternative method: Try direct groups API
        try {
            const groupsResponse = await api.asUser().requestJira(route`/rest/api/3/group/member?accountId=${req.context.accountId}&includeInactiveUsers=false`);
            const groupsData = await groupsResponse.json();

            console.log('Direct groups API response status:', groupsResponse.status);
            console.log('Direct groups data:', JSON.stringify(groupsData, null, 2));

        } catch (directError) {
            console.log('Direct groups API error:', directError.message);
        }

        // Check for Admin and QA Manager roles
        const userGroups = user.groups?.items || [];
        const hasAuthorizedRole = userGroups.some(group => {
            const groupName = group.name.toLowerCase();
            return groupName.includes('QA Manager')
        });

        console.log('User group names:', userGroups.map(g => g.name));
        console.log('Has authorized role (Admin/QA Manager):', hasAuthorizedRole);

        return {
            hasAccess: hasAuthorizedRole,
            user: user,
            groups: userGroups,
            accountId: req.context.accountId
        };

    } catch (error) {
        console.error('Error in checkUserAccess:', error);
        console.log('Request context:', req.context);

        // Fallback: allow access if we can't determine roles
        return {
            hasAccess: true,
            user: null,
            error: error.message,
            context: req.context
        };
    }
});

export const handler = resolver.getDefinitions();

