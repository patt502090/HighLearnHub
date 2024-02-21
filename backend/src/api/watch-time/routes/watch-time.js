'use strict';

/**
 * watch-time router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::watch-time.watch-time');
