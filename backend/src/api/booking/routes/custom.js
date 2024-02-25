'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'POST',
            path: '/createBooking',
            handler: 'booking.createBooking'
        }
    ]
}