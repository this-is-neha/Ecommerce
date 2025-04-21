
// const userRoutes=require('express').Router()
// const auth=require('../../middleware/auth.middleware');
// const allowRole=require("../../middleware/rbac.middleware");
// const userCtrl = require("./user.controller");
// userRoutes.route('/')


// .get(auth,allowRole(['admin']),userCtrl.index)


// module.exports=userRoutes









const userRoutes = require('express').Router();
const auth = require('../../middleware/auth.middleware');
const allowRole = require("../../middleware/rbac.middleware");
const userCtrl = require("./user.controller");

// Route definition with authentication middleware
userRoutes.route('/')
    .get(auth, 
        allowRole(['admin']),
         userCtrl.index);

module.exports = userRoutes;
