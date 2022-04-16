class ChampionDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, content, image, category FROM champions')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, content, image, category FROM champions WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (champion) {
    const response = await this.db.query('INSERT INTO champions (title, content, image, category) VALUES (?, ?, ?, ?)', [champion.title, champion.content, champion.image, champion.category])
    const result = response[0]
    return result.insertId
  }

  async update (champion) {
    const response = await this.db.query('UPDATE champions SET title = ?, content = ?, image = ?, category= ? WHERE id = ?', [champion.title, champion.content, champion.image, champion.category, champion.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM champions WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = ChampionDAO 
