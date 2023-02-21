const googleImageSearch = require("../model/googleImageSearch");
const { sendGpt } = require("../model/gpt");
const verbose = require("../utils/verbose");

const suggestionsNumber = 5;

const travelGetSuggestions = async (req, res) => {
  try {
    const gptResult = await sendGpt(
      `please give me an array structure [], of ${suggestionsNumber} random countries to visit in lifetime, and a small description, {title, description}, make sure to add apostrophes for keys also`
    );

    let gptResultFormatted = `${gptResult}`
      .replace(/'/g, '"')
      .replace(/\n|\r/g, "");

    gptResultFormatted = JSON.parse(gptResultFormatted);

    const finalArray = [];
    for (const country of gptResultFormatted) {
      try {
        const image = await googleImageSearch({ term: country.title });
        finalArray.push({ ...country, image });
      } catch (error) {
        verbose(
          `>travelGetSuggestions >>googleImageSearch @${country.title} error :: ${error}`,
          req
        );

        finalArray.push({ ...country });
      }
    }

    res.status(200).send(finalArray);
  } catch (error) {
    verbose(`travelGetSuggestions error :: ${error}`, req);

    res.status(400).send(`error occoured, please contact admin`);
  }
};

const travelGetCountrySuggestions = async (req, res) => {
  try {
    //advanced search details:
    const safeSearch = req.body.safeSearch || false;
    const extremeSearch = req.body.extremeSearch || false;
    const familyFriendlySearch = req.body.familyFriendlySearch || false;

    const country = req.params.country;
    const gptResult = await sendGpt(
      `please give me an array structure [], of ${
        familyFriendlySearch ? "family friendly " : ""
      }${suggestionsNumber} ${safeSearch ? "safe " : ""}${
        extremeSearch ? "adventurous and extreme " : ""
      }random places inside ${country} to visit in lifetime, and a small description, {title, description}, make sure to add apostrophes for keys also`
    );

    let gptResultFormatted = `${gptResult}`
      .replace(/'/g, '"')
      .replace(/\n|\r/g, "");

    gptResultFormatted = JSON.parse(gptResultFormatted);

    const finalArray = [];
    for (const suggestedLocation of gptResultFormatted) {
      try {
        const image = await googleImageSearch({
          term: suggestedLocation.title,
        });
        finalArray.push({ ...suggestedLocation, image });
      } catch (error) {
        verbose(
          `>travelGetCountrySuggestions >>googleImageSearch @${suggestedLocation.title} error :: ${error}`,
          req
        );
        finalArray.push({ ...suggestedLocation });
      }
    }

    res.status(200).send(finalArray);
  } catch (error) {
    verbose(`travelGetCountrySuggestions error :: ${error}`, req);
    res.status(400).send(`error occoured, please contact admin`);
  }
};

const travelGetDetailedInformation = async (req, res) => {
  try {
    const location = req.params.location;
    const gptResult = await sendGpt(
      `explain a little bit more about ${location}, and what i can do over there as a visitor`
    );
    res.status(200).send(gptResult);
  } catch (error) {
    verbose(`travelGetDetailedInformation error :: ${error}`, req);
    res.status(400).send(`error occoured, please contact admin`);
  }
};

module.exports = {
  travelGetSuggestions,
  travelGetCountrySuggestions,
  travelGetDetailedInformation,
};
