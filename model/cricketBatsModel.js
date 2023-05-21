// importing utils
const { writeDataToFile } = require('../utils');

// importing data
const cricketBats = require('../data/cricketBats.json');

// GET all cricketBats
const readAll = () => {
  return new Promise((resolve, reject) => {
    resolve(cricketBats);
  });
};

// GET a cricketBat
const readById = (id) => {
  return new Promise((resolve, reject) => {
    const cricketBat = cricketBats.find((c) => c.id === id);
    resolve(cricketBat);
  });
};

// create a cricketBat
const post = (cricketBatData) => {
  return new Promise((resolve, reject) => {
    const newId = cricketBats.length + 1;
    const { title, price, size } = cricketBatData;
    const newCricketBat = {
      id: newId.toString(),
      title: title || null,
      price: price || null,
      size: size || null,
    };
    cricketBats.push(newCricketBat);

    // writing to the file
    writeDataToFile('./data/cricketBats.json', JSON.stringify(cricketBats));

    resolve(newCricketBat);
  });
};

// update a cricketBat
const put = (cricketBatData, id) => {
  return new Promise((resolve, reject) => {
    const index = cricketBats.findIndex((c) => c.id === id);
    const updatedCricketBat = { id, ...cricketBatData };
    cricketBats[index] = updatedCricketBat;

    // writing to the file
    writeDataToFile('./data/cricketBats.json', JSON.stringify(cricketBats));

    resolve(updatedCricketBat);
  });
};

// delete a cricketBat
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const newCricketBats = cricketBats.filter((c) => c.id !== id);

    // writing to the file
    writeDataToFile('./data/cricketBats.json', JSON.stringify(newCricketBats));

    resolve(newCricketBats);
  });
};

module.exports = {
  readAll,
  readById,
  post,
  put,
  remove,
};
