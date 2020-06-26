const router = require('express').Router()
const GameController = require('../controller/gameController')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Tic-Tac-Toe'
    })
})
router.post('/signup', GameController.signup)
router.post('/data', GameController.findData)
router.put('/data', GameController.updateData)
router.delete('/data', GameController.delete)

module.exports = router