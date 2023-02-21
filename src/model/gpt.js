const axios = require("axios");
const { CreateUUID } = require("../utils/randomizer");
const verbose = require("../utils/verbose");
require("dotenv/config");
const model = "text-davinci-003";
const apiKey = process.env.GPT_API_KEY;

const sendGpt = (prompt) => {
  return new Promise(async (resolve, reject) => {
    const ticketId = CreateUUID();
    verbose(`GPT request init :: Id: ${ticketId} @query: ${prompt}`);
    try {
      const response = await axios({
        method: "post",
        url: `https://api.openai.com/v1/engines/${model}/completions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          prompt,
          temperature: 0,
          max_tokens: 2000,
        },
      });
      verbose(`GPT resolved OK :: Id: ${ticketId}`);
      return resolve(response.data.choices[0].text);
    } catch (error) {
      verbose(`GPT resolved error :: Id: ${ticketId}`);
      return reject(error);
    }
  });
};

module.exports = { sendGpt };
