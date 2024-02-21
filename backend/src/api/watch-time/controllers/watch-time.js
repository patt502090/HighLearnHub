'use strict';

/**
 * watch-time controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::watch-time.watch-time');
