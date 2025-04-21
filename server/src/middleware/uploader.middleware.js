// const multer = require("multer")
// // const { path } = require("../config/express.config")
// const fs = require("fs")
// const { generateRandomString } = require("../utilities/helpers")
// const setPath = (path) => {
//     return (req, res, next) => {
//         req.uplaodDir = path
//         next()
//     }
// }

// const myStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const path = "./public/uploads/" + req.uplaodDir
//         if (!fs.existsSync(path)) {
//             fs.mkdirSync(path, {
//                 recursive: true
//             })
//         }
//         cb(null, path)
//     },


// filename: (req, file, cb) => {
    
//     console.log(file)
//     const ext = file.originalname.split(".").pop()
//     const filename = Date.now() + "-" + generateRandomString(10) + "." +ext
//     cb(null, filename)
// }
// })


// const imageFilter = (req, file, cb) => {
//     const ext = file.originalname.split(".").pop()
//     const allowed = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'bmp']
//     if (allowed.includes(ext.toLowerCase())) {
//         cb(null, true)
//     }
//     else {
//         cb({
//             code: 400,
//             message: "Image format not supported"
//         })
//     }
// }

// const uploader = multer({
//     storage: myStorage,
//     fileFilter: imageFilter,
//     limits: {
//         fileSize: 3000000
//     }
// });

// module.exports = {
//     uploader,
//     setPath
// }

const multer = require("multer")
// const { path } = require("../config/express.config")
const fs = require("fs")
const { generateRandomString } = require("../utilities/helpers")
const setPath = (path) => {
    return (req, res, next) => {
        req.uplaodDir = path
        next()
    }
}

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./public/uploads/" + req.uplaodDir
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true
            })
        }
        cb(null, path)
    },


filename: (req, file, cb) => {
    
    console.log(file)
    const ext = file.originalname.split(".").pop()
    const filename = Date.now() + "-" + generateRandomString(10) + "." +ext
    cb(null, filename)
}
})


const imageFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop()
    const allowed = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'bmp']
    if (allowed.includes(ext.toLowerCase())) {
        cb(null, true)
    }
    else {
        cb({
            code: 400,
            message: "Image format not supported"
        })
    }
}

const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 3000000
    }
});

module.exports = {
    uploader,
    setPath
}

