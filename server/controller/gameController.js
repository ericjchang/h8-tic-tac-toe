const {Room} = require('../models');

class RoomController {
    static signup(req, res, next) {
        const row = '';
        const column = '';
        Room.count()
        .then(result => {
            let roomNumber = Math.floor(result/2)+1
            let {name} = req.body;
            Room.create({
                name,
                room: roomNumber,
                row,
                column,
            })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    name : data.name,
                    room: data.room
                })
                .catch(err => {
                    return next({
                        name: 'Internal Server Error',
                        errors : [{message : err}]
                    })
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}


module.exports = RoomController