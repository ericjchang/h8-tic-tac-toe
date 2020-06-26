const router = require('express').Router()
const gameController = require('../controller/gameController')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome'
    })
})
router.post('/signup', gameController.signup)
router.post('/data', gameController.findData)
router.put('/data', gameController.updateData)
router.delete('/data', gameController.delete)


module.exports = router