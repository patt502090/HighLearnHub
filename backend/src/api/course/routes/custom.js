'use strict';

module.exports = {
    routes: [
        { 
            method: 'GET',
            path: '/alreadyHaveBooking/:id',
            handler: 'course.alreadyHaveBooking'
        },
        { 
            method: "PUT",
            path: "/courses/:id/like",
            handler: "course.like",
        },
        { 
            method: "POST",
            path: "/mycourse",
            handler: "course.mycourse",
        }
    ]
};
