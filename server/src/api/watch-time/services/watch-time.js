'use strict';

/**
 * watch-time service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::watch-time.watch-time');
