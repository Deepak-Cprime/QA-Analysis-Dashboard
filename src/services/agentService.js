/**
 * Agent Service
 * Handles agent data operations and future endpoint integration
 */

import { getAgentDataWithMeta, getAgentsData } from '../models/agentData.js';

export class AgentService {
    constructor() {
        this.baseUrl = null; // Will be set when external API is integrated
    }

    /**
     * Get all agent data - currently from static model, will be replaced with API call
     * @returns {Promise<Object>} Agent data with metadata
     */
    async getAgentData() {
        try {
            console.log('Fetching agent data...');

            // TODO: Replace with actual API call when endpoint is available
            // const response = await fetch(`${this.baseUrl}/api/agents`);
            // const data = await response.json();
            // return data;

            // For now, return static data from model
            const agentData = getAgentDataWithMeta();
            console.log('Agent data retrieved successfully:', agentData.totalCount, 'agents');
            return agentData;

        } catch (error) {
            console.error('Error fetching agent data:', error.message);
            throw new Error('Unable to load agent data');
        }
    }

    /**
     * Get agent by ID
     * @param {number} agentId - Agent ID
     * @returns {Promise<Object|null>} Agent data or null if not found
     */
    async getAgentById(agentId) {
        try {
            const agents = getAgentsData();
            const agent = agents.find(a => a.id === agentId);

            if (!agent) {
                console.log(`Agent with ID ${agentId} not found`);
                return null;
            }

            console.log(`Agent ${agent.name} retrieved successfully`);
            return agent;

        } catch (error) {
            console.error('Error fetching agent by ID:', error.message);
            throw new Error('Unable to load agent');
        }
    }

    /**
     * Get agents filtered by performance level
     * @param {string} performanceLevel - 'high', 'medium', 'low', or 'all'
     * @returns {Promise<Array>} Filtered agent list
     */
    async getAgentsByPerformance(performanceLevel) {
        try {
            const agents = getAgentsData();

            if (performanceLevel === 'all') {
                return agents;
            }

            const filtered = agents.filter(agent => {
                switch (performanceLevel) {
                    case 'high':
                        return agent.overallScore >= 8.5;
                    case 'medium':
                        return agent.overallScore >= 7.0 && agent.overallScore < 8.5;
                    case 'low':
                        return agent.overallScore < 7.0;
                    default:
                        return true;
                }
            });

            console.log(`Found ${filtered.length} agents with ${performanceLevel} performance`);
            return filtered;

        } catch (error) {
            console.error('Error filtering agents by performance:', error.message);
            throw new Error('Unable to filter agents');
        }
    }

    /**
     * Get agent performance statistics
     * @returns {Promise<Object>} Performance statistics
     */
    async getPerformanceStats() {
        try {
            const agents = getAgentsData();

            const stats = {
                total: agents.length,
                highPerformers: agents.filter(a => a.overallScore >= 8.5).length,
                mediumPerformers: agents.filter(a => a.overallScore >= 7.0 && a.overallScore < 8.5).length,
                lowPerformers: agents.filter(a => a.overallScore < 7.0).length,
                averageScore: agents.reduce((sum, a) => sum + a.overallScore, 0) / agents.length,
                departments: {
                    customerSupport: agents.filter(a => a.department === 'Customer Support').length,
                    technicalSupport: agents.filter(a => a.department === 'Technical Support').length
                }
            };

            console.log('Performance statistics generated:', stats);
            return stats;

        } catch (error) {
            console.error('Error generating performance stats:', error.message);
            throw new Error('Unable to generate statistics');
        }
    }

    /**
     * Search agents by name
     * @param {string} searchTerm - Search term
     * @returns {Promise<Array>} Matching agents
     */
    async searchAgents(searchTerm) {
        try {
            if (!searchTerm || searchTerm.trim() === '') {
                return getAgentsData();
            }

            const agents = getAgentsData();
            const filtered = agents.filter(agent =>
                agent.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            console.log(`Found ${filtered.length} agents matching "${searchTerm}"`);
            return filtered;

        } catch (error) {
            console.error('Error searching agents:', error.message);
            throw new Error('Unable to search agents');
        }
    }

    /**
     * Set the base URL for external API calls
     * @param {string} url - Base URL for the external API
     */
    setBaseUrl(url) {
        this.baseUrl = url;
        console.log('Agent service base URL set to:', url);
    }

    /**
     * Validate agent data structure
     * @param {Object} agent - Agent data to validate
     * @returns {boolean} True if agent data is valid
     */
    validateAgentData(agent) {
        const requiredFields = ['id', 'name', 'email', 'department', 'overallScore', 'metrics'];

        for (const field of requiredFields) {
            if (!agent[field]) {
                console.error(`Invalid agent data: missing ${field}`);
                return false;
            }
        }

        // Validate metrics structure
        const requiredMetrics = [
            'empathy', 'clarity', 'completeness', 'professionalism',
            'ticketManagement', 'slaFirstResponse', 'slaResolution', 'errorRate',
            'fcr', 'avgTicketTime', 'postCoachingImprovement', 'customerSatisfactionScore'
        ];

        for (const metric of requiredMetrics) {
            if (typeof agent.metrics[metric] !== 'number') {
                console.error(`Invalid agent data: missing or invalid metric ${metric}`);
                return false;
            }
        }

        return true;
    }
}