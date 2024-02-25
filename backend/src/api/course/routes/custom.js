'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'GET',
            path: '/alreadyHaveBooking/:id',
            handler: 'course.alreadyHaveBooking'
        }
    ]
}