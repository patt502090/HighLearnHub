"use strict";

/**
 * course controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async alreadyHaveBooking(ctx) {
    const entityId = ctx.params.id;
    const user = ctx.state.user;

    const result = await strapi.entityService.findOne(
      "api::course.course",
      entityId,
      {
        populate: {
          bookings: {
            populate: "user",
            filters: {
              user: user,
            },
          },
        },
      }
    );
    return result.bookings;
  },

  async like(ctx) {
    const entityId = ctx.params.id;
    try {
      let course = await strapi.entityService.findOne(
        "api::course.course",
        entityId
      );
      // เพิ่มหรือลดจำนวนไลค์ตามสถานะปัจจุบันของคอร์ส
      course = await strapi.entityService.update(
        "api::course.course",
        entityId,
        { data: { like: (course.like || 0) + (course.like > 0 ? -1 : 1) } }
      );
      ctx.body = { ok: 1, likeCount: course.like };
    } catch (err) {
      ctx.body = err;
    }
  },

  async mycourse(ctx) {
    console.log(ctx.request["body"].id);
    const result = await strapi.entityService.findMany(
      "api::watch-time.watch-time",
      {
        populate: ['member'],
        filters: {
          member: ctx.state.user,
          populate: {
            course: ctx.request["body"].id
          }
        }
      }
    );
    return result
  },

  async init_watch_time(ctx) {
    console.log(ctx.request['body']);
    const result = await strapi.entityService.create('api::watch-time.watch-time', {
      populate: "*",
      data: {
        video: {
          id: ctx.request['body'].data.video
        },
        watch_time: 0,
        course: {
          id: ctx.request['body'].data.course
        },
        member: {
          id: ctx.state.user.id
        },
        publishedAt: ctx.request['body'].data.published_At
      },
    }
    )
    return result
  },
  async amount(ctx) {
    const entityId = ctx.params.id;
    
      const course = await strapi.entityService.findOne(
        "api::course.course",
        entityId
      );
      
      const courseAmount = await strapi.entityService.update(
        "api::course.course",
        entityId,
        { data: { amount: (course.amount || 0) + (course.amount !== course.maxamount ? 1 : 0) } }
      );
      ctx.body = { ok: 1, amount: course.amount };
  
    return courseAmount
  },
}));
