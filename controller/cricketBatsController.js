// importing models
const {
  readAll,
  readById,
  post,
  put,
  remove,
} = require('../model/cricketBatsModel');

// importing utils methods
const { getDataFromReq } = require('../utils');

// @desc Get all cricketBats
// @route GET /api/cricketBats
const getAllCricketBats = async (req, res) => {
  const cricketBats = await readAll();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(cricketBats));
};

// @desc Get a cricketBat by id
// @route GET /api/cricketBat/:id
const getCricketBat = async (req, res, id) => {
  try {
    const cricketBat = await readById(id);

    if (!cricketBat) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cricket Bat NOT FOUND' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ cricketBat }));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc create a cricket Bat
// @route POST /api/cricketBats/
const postCricketBat = async (req, res) => {
  try {
    const body = await getDataFromReq(req);

    if (!body) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'No Data received to create a Cricket Bat',
        })
      );
    } else {
      const cricketBatData = body;

      const newCricketBat = await post(cricketBatData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newCricketBat));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc update a cricket Bat
// @route PUT /api/cricketBats/:id
const putCricketBat = async (req, res, id) => {
  try {
    const cricketBat = await readById(id);

    if (!cricketBat) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cricket Bat NOT FOUND' }));
    } else {
      const body = await getDataFromReq(req);
      if (!body) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'No Data received to create a Cricket Bat',
          })
        );
      } else {
        const { title, price, size } = body;
        const cricketBatData = {
          title: title || cricketBat.title,
          price: price || cricketBat.price,
          size: size || cricketBat.size,
        };

        const updatedCricketBat = await put(cricketBatData, id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedCricketBat));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc delete a cricketBat
// @route DELETE /api/cricketBats/:id
const deleteCricketBat = async (req, res, id) => {
  try {
    const cricketBat = await readById(id);

    if (!cricketBat) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cricket Bat NOT FOUND' }));
    } else {
      const cricketBats = await remove(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cricketBats));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCricketBats,
  getCricketBat,
  postCricketBat,
  putCricketBat,
  deleteCricketBat,
};
