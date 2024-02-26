'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({
    async alreadyHaveBooking(ctx) {
        const entityId = ctx.params.id;
        const user = ctx.state.user
        console.log(user);
        const result = await strapi.entityService.findOne('api::course.course', entityId, {
            populate: {
                bookings: {
                    populate: "user",
                    filters: {
                        user: user
                    }
                }
            }
        });
        return result.bookings
    },
    async like(ctx) {
        const entityId = ctx.params.id;
        try {
          let book = await strapi.entityService.findOne('api::course.course', entityId)
          book = await strapi.entityService.update('api::course.course', entityId, { data: { like: (book.like|| 0) + 1 } })
          ctx.body = { ok: 1, likeCount: book.like };
        } catch (err) {
          ctx.body = err;
        }
      },
}));
