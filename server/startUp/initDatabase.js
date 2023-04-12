const Genre = require("../models/Genre");

const genresMock = require("../mock/genres.json");

module.exports = async () => {
  const genres = await Genre.find();
  if (genres.length !== genresMock.length) {
    await createInitialEntity(Genre, genresMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
