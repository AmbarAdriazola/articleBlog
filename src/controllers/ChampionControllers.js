const ChampionDAO = require('../models/dao/ChampionDAO')
const CategoryDAO = require('../models/dao/CategoryDAO')

class ChampionControllers {
  constructor (db) {
    this.championDao = new ChampionDAO(db)
    this.categoryDAO = new CategoryDAO(db)
    this.renderHomeWithChampion = this.renderHomeWithChampion.bind(this)
    this.renderSingleChampion = this.renderSingleChampion.bind(this)
    this.renderChampionCreationForm = this.renderChampionCreationForm.bind(this)
    this.renderChampionUpdateForm = this.renderChampionUpdateForm.bind(this)
    this.insertAndRenderChampion = this.insertAndRenderChampion.bind(this)
    this.updateAndRenderChampion = this.updateAndRenderChampion.bind(this)
    this.deleteChampionAndRenderResponse = this.deleteChampionAndRenderResponse.bind(this)
  }

  async renderHomeWithChampion (req, res) {
    const champions = await this.championDao.getAll()
    res.render('home', {
      champions
    })
  }

  async renderSingleChampion (req, res) {
    const id = req.params.id

    try {
      const champion = await this.championDao.getById(id)

      if (!champion) {
        res.status(404).render('404')
        return
      }

      res.render('champion', {
        id,
        title: champion.title,
        content: champion.content,
        image: champion.image,
        category: champion.category
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async renderChampionCreationForm (req, res) {
    const categorys = await this.categoryDAO.getAll()
    res.render('champion-form',{
      categorys
    })
  }

  async renderChampionUpdateForm (req, res) {
    const id = req.params.id
    const categorys = await this.categoryDAO.getAll()


    try {
      const champion = await this.championDao.getById(id)

      if (!champion) {
        res.status(404).render('404')
        return
      }
      categorys.forEach(element => {
        if (element.category == champion.category){
          element.select = 'selected'
        }
        else {
          element.select= ''
        }
      });
      res.render('champion-form', {
        id,
        title: champion.title,
        content: champion.content,
        image: champion.image,
        category: champion.category,
        categorys
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderChampion (req, res) {
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image
    const category = req.body.category

    const champion = { title, content, image, category }

    try {
      const id = await this.championDao.create(champion)

      res.redirect(`/champion/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderChampion (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image
    const category = req.body.category

    try {
      const champion = { title, content, id, image, category}

      await this.championDao.update(champion)

      res.redirect(`/champion/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteChampionAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const champion = await this.championDao.getById(id)

      if (!champion) {
        res.status(404).render('404')
        return
      }

      await this.championDao.delete(id)

      res.render('champion-deleted', {
        id,
        title: champion.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = ChampionControllers
