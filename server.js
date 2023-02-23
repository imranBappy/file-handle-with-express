const express = require("express");
const multer = require('multer')
const path = require('path')
const UPLOAD_FONDER = "./uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FONDER)
    },
    filename: (req, file, cb) => {
        const exeName = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(exeName, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
        cb(null, fileName + exeName);
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024 * 1024) * 4//  MB
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true)
        } else {
            cb(new Error("Only .jpeg, .jpg, .png formet allowed!"))
        }
        console.log(file)
    }
})
const app = express();

app.post('/', upload.single('profile'), (req, res) => {
    console.log(req.body)
    console.log(req.file.filename)
    res.json({ file: req.file, body: req.body })
})

app.get('/', (req, res) => {
    res.json({ hello: "world" })
})

app.listen(5000, () => {
    console.log("Listering...")
})