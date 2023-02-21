const gis = require("g-i-s");
module.exports = ({ term, imageSize = "512x512" }) => {
  return new Promise((resolve, reject) => {
    gis(
      `${term} real landscape ${imageSize ? `imagesize:${imageSize}` : ""}`,

      (error, results) => {
        if (error || !results.length) return reject(error);
        return resolve(results[0].url);
      }
    );
  });
};

// const client = new GoogleImages('a096009f7447e44c6', 'AIzaSyDSrEdAaAxm9vMY5Asc3-FEdzLJErItFgs');
// module.exports = ({ term, imageSize = "512x512" }) => {




  
//   client.search('Steve Angello')
//    .then(console.log)
// };



