/**
 * Dashboard Service
 * Handles dashboard data operations and future endpoint integration
 */

import { getDashboardKPIs } from '../models/dashboardData.js';

export class DashboardService {
    constructor() {
        this.baseUrl = null; // Will be set when external API is integrated
    }

    /**
     * Get dashboard data - currently from static model, will be replaced with API call
     * @returns {Promise<Object>} Dashboard KPI data
     */
    async getDashboardData() {
        try {
            console.log('Fetching dashboard data...');

            // TODO: Replace with actual API call when endpoint is available
            // const response = await fetch(`${this.baseUrl}/api/dashboard/kpis`);
            // const data = await response.json();
            // return data;

            // For now, return static data from model
            const dashboardData = getDashboardKPIs();
            console.log('Dashboard data retrieved successfully');
            return dashboardData;

        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            throw new Error('Unable to load dashboard data');
        }
    }

    /**
     * Set the base URL for external API calls
     * @param {string} url - Base URL for the external API
     */
    setBaseUrl(url) {
        this.baseUrl = url;
        console.log('Dashboard service base URL set to:', url);
    }

    /**
     * Validate dashboard data structure
     * @param {Object} data - Dashboard data to validate
     * @returns {boolean} True if data is valid
     */
    validateDashboardData(data) {
        const requiredKPIs = ['kpi1', 'kpi2', 'kpi3', 'kpi4', 'kpi5', 'kpi6','kpi7'];

        for (const kpi of requiredKPIs) {
            if (!data[kpi] || !data[kpi].name || !data[kpi].value) {
                console.error(`Invalid dashboard data: missing or incomplete ${kpi}`);
                return false;
            }
        }

        // Special validation for kpi3 (pillar performance)
        if (!data.kpi3.pillars || typeof data.kpi3.pillars !== 'object') {
            console.error('Invalid dashboard data: kpi3 missing pillars');
            return false;
        }

        return true;
    }

    /**
     * Get dashboard metrics summary
     * @returns {Promise<Object>} Summary of dashboard metrics
     */
    async getDashboardSummary() {
        try {
            const data = await this.getDashboardData();

            return {
                totalKPIs: 7,
                lastUpdated: new Date().toISOString(),
                summary: {
                    averageQAScore: data.kpi1.value,
                    errorRate: data.kpi2.value,
                    fcr: data.kpi4.value,
                    avgHandlingTime: data.kpi6.value
                }
            };
        } catch (error) {
            console.error('Error generating dashboard summary:', error.message);
            throw error;
        }
    }
}