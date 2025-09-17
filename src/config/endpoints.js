/**
 * API Endpoints Configuration
 * Define all external API endpoints for future integration
 */

// External API configuration
export const API_CONFIG = {
    // Base URL - to be configured when external API is available
    baseUrl: process.env.EXTERNAL_API_BASE_URL || 'https://api.example.com',

    // API version
    version: 'v1',

    // Timeout settings
    timeout: 30000, // 30 seconds

    // Retry settings
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
};

// Dashboard endpoints
export const DASHBOARD_ENDPOINTS = {
    // Get all dashboard KPIs
    getDashboardKPIs: '/dashboard/kpis',

    // Get specific KPI by ID
    getKPIById: (id) => `/dashboard/kpis/${id}`,

    // Get pillar performance data
    getPillarPerformance: '/dashboard/pillars',

    // Get dashboard summary
    getDashboardSummary: '/dashboard/summary'
};

// Agent endpoints
export const AGENT_ENDPOINTS = {
    // Get all agents
    getAllAgents: '/agents',

    // Get agent by ID
    getAgentById: (id) => `/agents/${id}`,

    // Get agents by department
    getAgentsByDepartment: (department) => `/agents?department=${department}`,

    // Get agents by performance level
    getAgentsByPerformance: (level) => `/agents?performance=${level}`,

    // Search agents
    searchAgents: (query) => `/agents/search?q=${encodeURIComponent(query)}`,

    // Get agent metrics
    getAgentMetrics: (id) => `/agents/${id}/metrics`,

    // Get agent performance history
    getAgentPerformanceHistory: (id) => `/agents/${id}/performance-history`,

    // Get performance statistics
    getPerformanceStats: '/agents/stats'
};

// Authentication endpoints
export const AUTH_ENDPOINTS = {
    // Verify user role
    verifyUserRole: '/auth/verify-role',

    // Get user permissions
    getUserPermissions: '/auth/permissions',

    // Check user access
    checkAccess: '/auth/check-access'
};

// Build full URL for an endpoint
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}${endpoint}`;
};

// Headers for API requests
export const getApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authentication headers when available
        // 'Authorization': `Bearer ${getAuthToken()}`
    };
};

// HTTP methods configuration
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};