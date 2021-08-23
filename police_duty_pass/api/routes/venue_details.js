const mysqlConnection = require('../config/db_connect')
const router = require('express').Router();

router.get('/active', (req, res, next) => {


    let sql = "SELECT `duty_place`, COUNT(*) AS `num` FROM `pass_gen_tbl` GROUP BY `duty_place`";

    mysqlConnection.query(sql, async(error, rows, filed) => {
        if (error) return res.status(201).json({ status: false, message: error });
        res.status(200).json({
            data: rows
        })
    })
})


module.exports = router;