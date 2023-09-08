const { Router } = require("express")
const { getToRead, postToRead, deleteToRead } = require("../controls/to_read")

const router = Router()

router.get('/', getToRead)

router.post('/:id', postToRead)

router.delete('/:id', deleteToRead)

module.exports = router