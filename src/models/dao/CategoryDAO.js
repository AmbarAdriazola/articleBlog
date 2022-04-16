class CategoryDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, description, category FROM category')
    const rows = response[0]
    return rows
  }

}

module.exports = CategoryDAO

