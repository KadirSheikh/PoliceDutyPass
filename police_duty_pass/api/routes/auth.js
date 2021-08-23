const mysqlConnection = require('../config/db_connect')
const router = require('express').Router();
const { adminRegistrationValidation, adminLoginValidation } = require('./validation')
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
    res.status(200).json({ status: true, message: 'Admin Authentication' })
})

router.post('/register', async(req, res, next) => {

    const { error } = adminRegistrationValidation(req.body);
    if (error) return res.status(200).json({ status: false, message: error.details[0].message });

    // Check for exiting user : Name & Email
    let sql = "SELECT * FROM admin_tbl WHERE name = ? AND email = ?";

    mysqlConnection.query(sql, [req.body.name, req.body.email], async(error, rows, field) => {
        if (!error && rows.length > 0) return res.status(200).json({ status: false, message: 'This name and email is already associated with an existing Admin' })


        // Create New Admin
        let sql = "INSERT INTO `admin_tbl`(`name`, `email`, `password`) VALUES (?,?,?)";
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

        mysqlConnection.query(sql, [req.body.name, req.body.email, hashedPassword], (error, rows, filed) => {
            if (error) return res.status(200).json({ status: false, message: error })

            return res.status(200).json({ status: true, message: "Successfully Registered", data: { admin_id: rows.insertId } })
        })
    })
})


router.post('/login', async(req, res, next) => {
    console.log(req.body)
    const { error } = adminLoginValidation(req.body);
    if (error) return res.status(200).json({ status: false, message: error.details[0].message });

    // Checking for admin
    let sql = "SELECT *  FROM admin_tbl WHERE email = ?";

    mysqlConnection.query(sql, [req.body.email], async(error, rows, filed) => {
        if (error) return res.status(200).json({ status: false, message: error })

        if (rows.length <= 0) return res.status(200).json({ status: false, message: "Invalid Email" })

        // check password
        if (!bcrypt.compareSync(req.body.password, rows[0].password)) return res.status(200).json({ status: false, message: "Invalid Password" })

        return res.status(200).json({ status: true, message: "Auth Success", data: rows[0] })

    })

});



module.exports = router;