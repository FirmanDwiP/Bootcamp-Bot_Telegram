const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    res.json({
        "Author": "Firman"
    })
})

module.exports = router
