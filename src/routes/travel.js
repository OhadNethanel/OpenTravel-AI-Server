const {
  travelGetSuggestions,
  travelGetCountrySuggestions,
  travelGetDetailedInformation,
} = require("../controller/travelController");

const router = require("express").Router();

router.get("/getSuggestions", travelGetSuggestions);
router.post("/getCountrySuggestions/:country", travelGetCountrySuggestions);
router.get("/getDetailedInformation/:location", travelGetDetailedInformation);

module.exports = router;
