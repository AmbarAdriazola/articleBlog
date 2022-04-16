const express = require('express')
const ChampionControllers = require('./controllers/ChampionControllers')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const championControllers = new ChampionControllers(sqlClient)

// Routes
router.get('/', championControllers.renderHomeWithChampion)
router.get('/about', pageController.renderAbout)

router.get('/champions/create', championControllers.renderChampionCreationForm)
router.post('/champions/create', championControllers.insertAndRenderChampion)

router.get('/champion/:id', championControllers.renderSingleChampion)

router.get('/champions/:id/update', championControllers.renderChampionUpdateForm)
router.post('/champions/:id/update', championControllers.updateAndRenderChampion)

router.post('/champions/:id/delete', championControllers.deleteChampionAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
