# Backend Integration Guide

This document explains how to integrate the QA Dashboard with external APIs when they become available.

## Current Architecture

The backend has been refactored into a modular architecture with the following structure:

```
src/
├── models/           # Data models and schemas
│   ├── dashboardData.js
│   └── agentData.js
├── services/         # Business logic services
│   ├── authService.js
│   ├── dashboardService.js
│   ├── agentService.js
│   └── index.js
├── utils/           # Utility functions
│   ├── errorHandler.js
│   └── apiClient.js
├── config/          # Configuration files
│   └── endpoints.js
└── index.js         # Main resolver file
```

## Integration Steps

### 1. Update Configuration

Update `src/config/endpoints.js`:

```javascript
export const API_CONFIG = {
    baseUrl: 'https://your-actual-api.com',
    version: 'v1',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
};
```

### 2. Enable API Client

In `src/utils/apiClient.js`, uncomment the actual HTTP request code:

```javascript
// Replace this:
throw new Error('External API not configured. Using static data.');

// With this:
const response = await fetch(url, requestOptions);

if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

const data = await response.json();
return data;
```

### 3. Update Services

#### Dashboard Service (`src/services/dashboardService.js`)

Replace static data calls with API calls:

```javascript
async getDashboardData() {
    try {
        console.log('Fetching dashboard data from API...');

        const url = buildApiUrl(DASHBOARD_ENDPOINTS.getDashboardKPIs);
        const data = await apiClient.get(url);

        if (!this.validateDashboardData(data)) {
            throw new Error('Invalid dashboard data received from API');
        }

        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        throw new Error('Unable to load dashboard data');
    }
}
```

#### Agent Service (`src/services/agentService.js`)

Replace static data calls with API calls:

```javascript
async getAgentData() {
    try {
        console.log('Fetching agent data from API...');

        const url = buildApiUrl(AGENT_ENDPOINTS.getAllAgents);
        const data = await apiClient.get(url);

        return data;
    } catch (error) {
        console.error('Error fetching agent data:', error.message);
        throw new Error('Unable to load agent data');
    }
}
```

### 4. Environment Variables

Add environment variables for API configuration:

```bash
# .env file
EXTERNAL_API_BASE_URL=https://your-api.com
API_VERSION=v1
API_TIMEOUT=30000
```

### 5. Authentication Headers

Update `src/config/endpoints.js` to include authentication:

```javascript
export const getApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
        'X-API-Key': process.env.API_KEY
    };
};
```

## API Contract

### Dashboard Endpoints

#### GET /api/v1/dashboard/kpis
Expected response:
```json
{
    "kpi1": { "name": "Average QA scores", "value": "8.6" },
    "kpi2": { "name": "Error rates", "value": "15%" },
    "kpi3": {
        "name": "Pillar wise performance",
        "value": "Good",
        "pillars": {
            "empathy": 8.2,
            "clarity": 7.8,
            "professionalism": 9.1,
            "completeness": 8.5,
            "accuracy": 8.9,
            "efficiency": 7.6,
            "resolutionQuality": 8.7
        }
    },
    "kpi4": { "name": "FCR", "value": "70%" },
    "kpi5": { "name": "Performance after coaching", "value": "+50%" },
    "kpi6": { "name": "Average ticket handling time", "value": "11 min" }
}
```

### Agent Endpoints

#### GET /api/v1/agents
Expected response:
```json
{
    "agents": [
        {
            "id": 1,
            "name": "Sarah Johnson",
            "email": "sarah.johnson@company.com",
            "department": "Customer Support",
            "hireDate": "2022-03-15",
            "overallScore": 8.4,
            "metrics": {
                "empathy": 8.2,
                "clarity": 7.8,
                "professionalism": 9.1,
                "completeness": 8.5,
                "accuracy": 8.9,
                "efficiency": 7.6,
                "resolutionQuality": 8.7,
                "errorRate": 12,
                "fcr": 75,
                "avgTicketTime": 9,
                "postCoachingImprovement": 45
            },
            "recentPerformance": {
                "thisMonth": 8.6,
                "lastMonth": 8.2,
                "trend": "improving"
            }
        }
    ],
    "totalCount": 10,
    "lastUpdated": "2023-12-01T10:00:00Z"
}
```

## Error Handling

The system includes comprehensive error handling:

- **Network errors**: Automatically retried with exponential backoff
- **Authentication errors**: Not retried, user notified
- **Data validation errors**: Logged and appropriate fallbacks used
- **Service unavailable**: Graceful degradation with appropriate user messages

## Monitoring and Logging

All API calls are logged with:
- Request URL and method
- Response status and timing
- Error details and stack traces
- User context information

## Testing Integration

1. **Unit Tests**: Test services with mocked API responses
2. **Integration Tests**: Test against staging API
3. **End-to-End Tests**: Full user workflow testing

## Rollback Plan

If API integration fails:
1. Set `EXTERNAL_API_BASE_URL` to empty string
2. Services will automatically fall back to static data
3. Application continues to function normally

## Performance Considerations

- **Caching**: Implement Redis caching for frequently accessed data
- **Rate Limiting**: Respect API rate limits with appropriate throttling
- **Lazy Loading**: Load agent data only when Agents tab is accessed
- **Pagination**: Implement server-side pagination for large datasets

## Security

- All API communications use HTTPS
- Authentication tokens are securely stored
- Input validation on all API responses
- No sensitive data logged in production