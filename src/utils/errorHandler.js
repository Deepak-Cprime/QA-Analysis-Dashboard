/**
 * Error Handler Utilities
 * Centralized error handling for the application
 */

export class ErrorHandler {
    /**
     * Handle and format resolver errors
     * @param {Error} error - The error object
     * @param {string} context - Context where error occurred
     * @returns {Error} Formatted error
     */
    static handleResolverError(error, context) {
        console.error(`Error in ${context}:`, error.message);

        // Handle access denied errors specifically
        if (error.message && error.message.includes('ACCESS_DENIED')) {
            return error; // Re-throw access denied errors as-is
        }

        // Handle API errors
        if (error.message && error.message.includes('API returned')) {
            return new Error(`Service temporarily unavailable. Please try again later.`);
        }

        // Handle network/connection errors
        if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
            return new Error(`Network error. Please check your connection and try again.`);
        }

        // Generic error for everything else
        return new Error(`Unable to load ${context.replace('get', '').toLowerCase()} data. Please try again.`);
    }

    /**
     * Log error with additional context
     * @param {Error} error - The error object
     * @param {Object} context - Additional context information
     */
    static logError(error, context = {}) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            context: context
        };

        console.error('Application Error:', JSON.stringify(errorInfo, null, 2));
    }

    /**
     * Create a standardized error response
     * @param {string} code - Error code
     * @param {string} message - Error message
     * @param {Object} details - Additional error details
     * @returns {Object} Standardized error object
     */
    static createErrorResponse(code, message, details = {}) {
        return {
            error: {
                code: code,
                message: message,
                details: details,
                timestamp: new Date().toISOString()
            }
        };
    }

    /**
     * Check if error is a known type
     * @param {Error} error - The error object
     * @returns {string} Error type
     */
    static getErrorType(error) {
        if (error.message.includes('ACCESS_DENIED')) {
            return 'ACCESS_DENIED';
        }
        if (error.message.includes('API returned')) {
            return 'API_ERROR';
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
            return 'NETWORK_ERROR';
        }
        if (error.message.includes('validation') || error.message.includes('invalid')) {
            return 'VALIDATION_ERROR';
        }
        return 'UNKNOWN_ERROR';
    }
}