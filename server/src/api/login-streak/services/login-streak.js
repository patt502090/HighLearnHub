'use strict';

/**
 * login-streak service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::login-streak.login-streak');
