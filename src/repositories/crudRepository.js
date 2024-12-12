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

    getById: async function (id1) {
      const doc = await model.findById( id1);
      return doc;
    },

    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },

    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndDelete(id, data, {
        new: true
      });
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
