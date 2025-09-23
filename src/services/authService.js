/**
 * Authentication Service
 * Handles user role verification and access control
 */

import api, { route } from '@forge/api';

export class AuthService {
    constructor() {
        // Remove hardcoded values - will get from context and API
    }

    /**
     * Verify if user has QA Manager role
     * @param {string} accountId - User account ID
     * @returns {Promise<boolean>} - True if user has QA Manager role
     */
    async verifyQAManagerRole(accountId, context = null) {
        try {
            console.log('Verifying QA Manager role for user:', accountId);

            // Get project key from context
            const projectKey = context?.extension?.project?.key;
            if (!projectKey) {
                throw new Error('Project key not available in context');
            }
            console.log('Using project key from context:', projectKey);

            // First, get all available roles in this project
            const rolesResponse = await api.asUser().requestJira(
                route`/rest/api/3/project/${projectKey}/role`
            );
            const roles = await rolesResponse.json();
            console.log('Available project roles:', JSON.stringify(roles, null, 2));

            // Find QA Manager role by name (roles object has role names as keys)
            const qaManagerRoleName = Object.keys(roles).find(roleName =>
                roleName.toLowerCase() === 'qa manager'
            );

            if (!qaManagerRoleName) {
                console.log('QA Manager role not found in project');
                return false;
            }

            // Extract role ID from the URL
            const qaManagerRoleUrl = roles[qaManagerRoleName];
            const roleIdMatch = qaManagerRoleUrl.match(/\/role\/(\d+)$/);
            const qaManagerRoleId = roleIdMatch ? roleIdMatch[1] : null;

            if (!qaManagerRoleId) {
                console.log('Could not extract QA Manager role ID from URL');
                return false;
            }

            console.log('Found QA Manager role with ID:', qaManagerRoleId);

            // Get the specific role data
            const response = await api.asUser().requestJira(
                route`/rest/api/3/project/${projectKey}/role/${qaManagerRoleId}`
            );

            if (response.status === 200) {
                const roleData = await response.json();
                console.log('QA Manager role data:', JSON.stringify(roleData, null, 2));

                // Check if current user is in the QA Manager role actors
                const hasQAManagerRole = roleData.actors.some(actor =>
                    actor.actorUser && actor.actorUser.accountId === accountId
                );

                console.log('QA Manager role verification result:', hasQAManagerRole);
                return hasQAManagerRole;
            } else {
                console.error('Role verification failed with status:', response.status);
                throw new Error(`Unable to verify user role - API returned ${response.status}`);
            }
        } catch (error) {
            console.error('Error in verifyQAManagerRole:', error.message);
            throw error;
        }
    }

    /**
     * Check user access with detailed information
     * @param {string} accountId - User account ID
     * @returns {Promise<Object>} - User access information
     */
    async checkUserAccess(accountId) {
        try {
            console.log('Checking user access...');

            // Get current user with groups expanded
            const userResponse = await api.asUser().requestJira(
                route`/rest/api/2/user?accountId=${accountId}&expand=groups`
            );
            const user = await userResponse.json();

            console.log('Current user:', {
                displayName: user.displayName,
                emailAddress: user.emailAddress,
                accountId: user.accountId
            });

            // Check for QA Manager roles in groups
            const userGroups = user.groups?.items || [];
            const hasAuthorizedRole = userGroups.some(group => {
                const groupName = group.name.toLowerCase();
                return groupName.includes('qa manager');
            });

            console.log('User group names:', userGroups.map(g => g.name));
            console.log('Has authorized role (QA Manager):', hasAuthorizedRole);

            return {
                hasAccess: hasAuthorizedRole,
                user: user,
                groups: userGroups,
                accountId: accountId
            };

        } catch (error) {
            console.error('Error in checkUserAccess:', error);

            // Fallback: allow access if we can't determine roles
            return {
                hasAccess: true,
                user: null,
                error: error.message,
                accountId: accountId
            };
        }
    }

    /**
     * Validate access and throw appropriate error if denied
     * @param {string} accountId - User account ID
     * @param {string} resourceType - Type of resource being accessed
     * @throws {Error} - Access denied error if user lacks permissions
     */
    async validateAccess(accountId, resourceType = 'dashboard', context = null) {
        const hasAccess = await this.verifyQAManagerRole(accountId, context);

        if (!hasAccess) {
            console.log('Access denied: User not in QA Manager role');
            throw new Error(`ACCESS_DENIED: You are not a QA Manager. No access to ${resourceType}.`);
        }

        console.log('Access granted: User has QA Manager role');
    }
}