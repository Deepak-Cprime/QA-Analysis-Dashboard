import Resolver from '@forge/resolver';
import { AuthService, DashboardService, AgentService } from './services/index.js';
import { ErrorHandler } from './utils/errorHandler.js';

const resolver = new Resolver();

// Initialize services
const authService = new AuthService();
const dashboardService = new DashboardService();
const agentService = new AgentService();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});

resolver.define('getDashboardData', async (req) => {
    try {
        console.log('Dashboard data requested for user:', req.context.accountId);

        // Validate user access
        await authService.validateAccess(req.context.accountId, 'dashboard');

        // Get dashboard data
        const dashboardData = await dashboardService.getDashboardData();

        return dashboardData;

    } catch (error) {
        const handledError = ErrorHandler.handleResolverError(error, 'getDashboardData');
        ErrorHandler.logError(handledError, {
            accountId: req.context.accountId,
            resolver: 'getDashboardData'
        });
        throw handledError;
    }
});

resolver.define('getAgentData', async (req) => {
    try {
        console.log('Agent data requested for user:', req.context.accountId);

        // Validate user access
        await authService.validateAccess(req.context.accountId, 'agent data');

        // Get agent data
        const agentData = await agentService.getAgentData();

        return agentData;

    } catch (error) {
        const handledError = ErrorHandler.handleResolverError(error, 'getAgentData');
        ErrorHandler.logError(handledError, {
            accountId: req.context.accountId,
            resolver: 'getAgentData'
        });
        throw handledError;
    }
});

resolver.define('checkUserAccess', async (req) => {
    try {
        console.log('Checking user access...');

        // Use the auth service to check user access
        const accessResult = await authService.checkUserAccess(req.context.accountId);

        return accessResult;

    } catch (error) {
        const handledError = ErrorHandler.handleResolverError(error, 'checkUserAccess');
        ErrorHandler.logError(handledError, {
            accountId: req.context.accountId,
            resolver: 'checkUserAccess'
        });
        throw handledError;
    }
});

export const handler = resolver.getDefinitions();

