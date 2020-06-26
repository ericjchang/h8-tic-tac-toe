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
                        name: 'InternalServerError',
                        errors : [{message : err}]
                    })
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    static findData(req, res, next) {
        Room.findAll({
            where: {
                room:req.body.room
            },
            order: ['id', 'ASC']
        })
        .then(result => {
            res.status(200).json({
                users:result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    static updateData(req, res, next) {
        const {name, room} = req.headers
        Room.findOne({
            where: {
                name,
                room
            }
        })
        .then(result => {
            let oldRow
            if(result.row.length > 0) {
                oldRow = result.row + ',' + req.body.chose 
            } else {
                oldRow = req.body.chose
            }
            Room.update({
                row: oldRow
            },
            {
                where: {
                    room,
                    name
                }
            })
            .then(result => {
                res.status(200).json({
                    users:result
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete(req, res) {
        Room.findByPk(req.params.id)
        .then(data => {
                if(data) {
                    Room.destroy({where:{id:req.params.id}})
                    .then(data => {
                        res.status(200).json({status:200, message:`Succesfully delete room`})
                    })
                } else {
                    res.status(404).json({status: 404, error:`Not Found`})
                }
        })
        .catch(err => {
            res.status(500).json({status:500, error:err})
        })
    }


}


module.exports = RoomController