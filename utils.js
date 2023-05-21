// importing fs module
const fs = require('fs');

const writeDataToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf-8', (error) => console.log(error));
};

const getDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
};

module.exports = {
  getDataFromReq,
  writeDataToFile,
};
