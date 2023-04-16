const express = require('express')
const router = express.Router()

const regionController = require('../controllers/region')
const riskyController = require('../controllers/risky')
const hk4eShieldController = require('../controllers/hk4e.shield')
const hk4eGranterController = require('../controllers/hk4e.granter')
const accountController = require('../controllers/account')

router.get('/', accountController.showRegister)
router.post('/account/register', accountController.doRegister)
router.get('/query_region_list', regionController.regionList)
router.post('/account/risky/api/check', riskyController.riskCheck)
router.post('/hk4e_global/mdk/shield/api/loadConfig', hk4eShieldController.loadConfig)
router.post('/hk4e_global/mdk/shield/api/login', hk4eShieldController.login)
router.post('/hk4e_global/mdk/shield/api/verify', hk4eShieldController.verify)
router.post('/hk4e_global/combo/granter/api/getConfig', hk4eGranterController.getConfig)
router.post('/hk4e_global/combo/granter/login/v2/login', hk4eGranterController.login)

module.exports = router
