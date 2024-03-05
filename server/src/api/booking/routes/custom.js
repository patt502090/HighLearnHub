'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'POST',
            path: '/createBooking',
            handler: 'booking.createBooking'
        },
        {
            method: 'GET',
            path: '/userList',
            handler: 'booking.userList'
        }
    ]
}