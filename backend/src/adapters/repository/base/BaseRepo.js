export class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const doc = await this.model.create(data)
        return doc.toObject()
    }

    async delete(id) {
        const deleted = await this.model.findByIdAndDelete(id)
        return deleted?.toObject()
    }

    async findById(id) {
        const user = await this.model.findById(id)
        return user?.toObject()
    }

    async findByEmail(email) {
        const user = await this.model.findOne({ email })
        return user?.toObject()
    }   
    
}
