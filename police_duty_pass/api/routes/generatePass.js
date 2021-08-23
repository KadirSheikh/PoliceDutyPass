const mysqlConnection = require('../config/db_connect')
const router = require('express').Router();
const { passGenerateValidation } = require('./validation')
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const unzipper = require('unzipper');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'api/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const zipStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'api/zips/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });
var zipUpload = multer({ storage: zipStorage });

router.get('/', (req, res, next) => {
    res.status(200).json({ status: true, message: 'Admin Authentication' })
})

router.post('/generate', upload.single('photo'), async(req, res, next) => {
    // console.log(req.body);
    const file = req.file;
    console.log(file);
    // res.send(file);
    // res.status(200).json({
    //     "message": "success"
    // });


    //error message
    const { error } = passGenerateValidation(req.body);
    if (error) return res.status(200).json({ status: false, message: error.details[0].message });



    let sql = "INSERT INTO `pass_gen_tbl`( `id_number`,`name`, `designation`, `mobile`, `company_name`, `station`, `duty_place`, `pass_type`, `lineup`, `proximity`, `start_date`, `end_date` ,`pass_size`, `pass_color`,`photo`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    mysqlConnection.query(sql, [req.body.id_number, req.body.name, req.body.designation, req.body.mobile, req.body.company_name, req.body.station, req.body.duty_place, req.body.pass_type, req.body.lineup, req.body.proximity, req.body.start_date, req.body.end_date, req.body.pass_size, req.body.pass_color, req.file.filename], (error, row, field) => {
        if (error) return res.status(201).json({ status: false, message: error, data: row });

        return res.status(200).json({ status: true, message: "Pass Generated", data: row });

    });
});

router.post('/upload-zip', zipUpload.single('zip'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        const err = new Error('Please upload a zip file');
        err.httpStatusCode = 400;
        return next(err);
    }

    // fs.createReadStream(file.path).pipe(unzip.Extract({ path: 'api/images/' }));

    fs.createReadStream(file.path).pipe(unzipper.Extract({ path: 'api/' }));


})

router.get('/pass-list', (req, res, next) => {
    var sql = 'SELECT * FROM pass_gen_tbl';
    mysqlConnection.query(sql, (error, data, fields) => {
        if (error) return res.status(201).json({ status: false, message: error });

        return res.status(200).json({ userData: data });

    });
});

router.get('/user/:id', (req, res, next) => {
    var sql = 'SELECT * FROM pass_gen_tbl where Id=?';

    mysqlConnection.query(sql, [req.params.id], (error, data, fields) => {
        if (error) return res.status(201).json({ status: false, message: error });
        res.status(200).json({
            "status": true,
            singleData: data
        })
    });
});

router.put('/updatePass/:id', upload.single("photo"), (req, res, next) => {
    // console.log(req.file);
    // res.send(req.file);
    // console.log(req);
    // console.log(req.params);

    // const { error } = passGenerateValidation(req.body);
    // if (error) return res.status(200).json({ status: false, message: error.details[0].message });


    if (req.file) {
        var sql = "UPDATE `pass_gen_tbl` SET `id_number`=?,`name`=?,`designation`=?,`mobile`=?,`company_name`=?,`station`=?,`duty_place`=?,`pass_type`=?,`lineup`=?,`proximity`=?,`start_date`=?,`end_date`=?,`pass_size`=?,`pass_color`=?,`photo`=? WHERE `id`=?";

        mysqlConnection.query(sql, [req.body.id_number, req.body.name, req.body.designation, req.body.mobile, req.body.company_name, req.body.station, req.body.duty_place, req.body.pass_type, req.body.lineup, req.body.proximity, req.body.start_date, req.body.end_date, req.body.pass_size, req.body.pass_color, req.file.filename, req.params.id], (error, data, field) => {
            if (error) return res.status(201).json({ status: false, message: error });

            return res.status(200).json({ status: true, message: "Pass Updated", userData: data });

        });
    } else {
        var sql = "UPDATE `pass_gen_tbl` SET `id_number`=?,`name`=?,`designation`=?,`mobile`=?,`company_name`=?,`station`=?,`duty_place`=?,`pass_type`=?,`lineup`=?,`proximity`=?,`start_date`=?,`end_date`=?,`pass_size`=?,`pass_color`=? WHERE `id`=?";

        mysqlConnection.query(sql, [req.body.id_number, req.body.name, req.body.designation, req.body.mobile, req.body.company_name, req.body.station, req.body.duty_place, req.body.pass_type, req.body.lineup, req.body.proximity, req.body.start_date, req.body.end_date, req.body.pass_size, req.body.pass_color, req.params.id], (error, data, field) => {
            if (error) return res.status(201).json({ status: false, message: error });

            return res.status(200).json({ status: true, message: "Pass Updated", userData: data });

        });
    }


});



router.post('/uploadExcel', (req, res, next) => {
    // console.log(req.body);

    let sql = "INSERT INTO `pass_gen_tbl`(`id_number`, `name`, `designation`, `mobile`, `company_name`, `station`, `duty_place`, `start_date`, `end_date` , `pass_type`,`pass_color`,`lineup`,`proximity`,`photo`,`pass_size`) VALUES ?";

    mysqlConnection.query(sql, [req.body.data], (error, row, field) => {
        if (error) return res.status(201).json({ status: false, message: error });

        return res.status(200).json({ status: true, message: "Bulk Pass Generated" });

    });
});


router.get('/history', (req, res, next) => {
    var sql = 'SELECT * FROM pass_gen_tbl WHERE is_active=1';
    mysqlConnection.query(sql, (error, data, fields) => {
        if (error) return res.status(201).json({ status: false, message: error });

        return res.status(200).json({ userData: data });

    });
});


router.put('/expirepass', (req, res, next) => {
    var sql = "UPDATE pass_gen_tbl SET is_active=1 WHERE end_date > ?";
    mysqlConnection.query(sql, [req.body.data], (error, data, fields) => {
        if (error) return res.status(201).json({ status: false, message: error });

        return res.status(200).json({ userData: data });

    });

})

router.get('/venuePeople/:dutyPlace', (req, res, next) => {
    var sql = 'SELECT * FROM pass_gen_tbl WHERE duty_place=?';
    mysqlConnection.query(sql, [req.params.dutyPlace], (error, data, fields) => {
        if (error) return res.status(201).json({ status: false, message: error });

        return res.status(200).json({ userData: data });

    });
});






module.exports = router;