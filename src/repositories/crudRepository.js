export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },

    getAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },

    getById: async function (id) {
      //  console.log('id get by id', id);

      const doc = await model.findById(id);

      //  console.log('doc find by id', doc);

      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },

    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      console.log('updated doc', updatedDoc);

      return updatedDoc;
    },

    deleteMany: async function (modelIds) {
      const response = await model.deleteMany({
        _id: {
          $in: modelIds
        }
      });
      return response;
    }
  };
}
