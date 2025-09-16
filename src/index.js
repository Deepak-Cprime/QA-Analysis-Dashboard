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

