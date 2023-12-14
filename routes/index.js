const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use((res, req) => {
  return res.statusCode(404).send(`No Route Found`);
});

module.exports = router;
