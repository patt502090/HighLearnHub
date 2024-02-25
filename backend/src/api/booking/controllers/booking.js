'use strict';

/**
 * booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({
    async createBooking(ctx) {

        const user = ctx.state.user.id
        console.log(user);
        const request = ctx.request["body"].data
        console.log(request);
        const result = await strapi.entityService.findMany('api::booking.booking', {
            populate: "*",
            filters: {
                user: user,
                course: {
                    id: request.course
                }
            }
        });

        if (result["id"]) {
            return "you already have this course booking"
        }

        else {
            const create = await strapi.entityService.create('api::booking.booking', {
                populate: "*",
                data: {
                    ...request,
                    course: {
                        id: request.course
                    },
                    user: {
                        id: user,
                    },
                    publishedAt: request.publishedAt
                }
            });
            return create
        }
    },
}));
