/**
 * API Client Utility
 * HTTP client for making requests to external APIs
 */

import { API_CONFIG, getApiHeaders, HTTP_METHODS } from '../config/endpoints.js';

export class ApiClient {
    constructor() {
        this.baseUrl = API_CONFIG.baseUrl;
        this.timeout = API_CONFIG.timeout;
        this.retryAttempts = API_CONFIG.retryAttempts;
        this.retryDelay = API_CONFIG.retryDelay;
    }

    /**
     * Make an HTTP request with retry logic
     * @param {string} url - The URL to request
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response data
     */
    async makeRequest(url, options = {}) {
        const requestOptions = {
            method: HTTP_METHODS.GET,
            headers: getApiHeaders(),
            timeout: this.timeout,
            ...options
        };

        let lastError;

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                console.log(`API Request attempt ${attempt}:`, url);

                // TODO: Replace with actual HTTP client when external API is available
                // const response = await fetch(url, requestOptions);
                //
                // if (!response.ok) {
                //     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                // }
                //
                // const data = await response.json();
                // return data;

                // For now, throw an error to indicate external API is not available
                throw new Error('External API not configured. Using static data.');

            } catch (error) {
                lastError = error;
                console.error(`API request attempt ${attempt} failed:`, error.message);

                // Don't retry on certain errors
                if (this.shouldNotRetry(error)) {
                    break;
                }

                // Wait before retrying (except on last attempt)
                if (attempt < this.retryAttempts) {
                    await this.delay(this.retryDelay * attempt);
                }
            }
        }

        throw new Error(`API request failed after ${this.retryAttempts} attempts: ${lastError.message}`);
    }

    /**
     * GET request
     * @param {string} url - The URL to request
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async get(url, options = {}) {
        return this.makeRequest(url, {
            ...options,
            method: HTTP_METHODS.GET
        });
    }

    /**
     * POST request
     * @param {string} url - The URL to request
     * @param {Object} data - Request body data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async post(url, data, options = {}) {
        return this.makeRequest(url, {
            ...options,
            method: HTTP_METHODS.POST,
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     * @param {string} url - The URL to request
     * @param {Object} data - Request body data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async put(url, data, options = {}) {
        return this.makeRequest(url, {
            ...options,
            method: HTTP_METHODS.PUT,
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     * @param {string} url - The URL to request
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async delete(url, options = {}) {
        return this.makeRequest(url, {
            ...options,
            method: HTTP_METHODS.DELETE
        });
    }

    /**
     * Check if error should not be retried
     * @param {Error} error - The error object
     * @returns {boolean} True if should not retry
     */
    shouldNotRetry(error) {
        // Don't retry on authentication errors, bad requests, etc.
        const nonRetryableErrors = [
            'External API not configured',
            'Authentication failed',
            'Bad Request',
            'Unauthorized',
            'Forbidden',
            'Not Found'
        ];

        return nonRetryableErrors.some(msg => error.message.includes(msg));
    }

    /**
     * Delay utility for retry logic
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set base URL for the API client
     * @param {string} url - New base URL
     */
    setBaseUrl(url) {
        this.baseUrl = url;
        console.log('API client base URL set to:', url);
    }
}

// Export singleton instance
export const apiClient = new ApiClient();