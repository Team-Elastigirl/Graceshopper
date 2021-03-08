const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const err = new Error('Stop, in the name of law')
    res.redirect('/')
    err.status = 401
    return next(err)
  }
}

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'username', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/:userId
router.get('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) return res.sendStatus(404)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
