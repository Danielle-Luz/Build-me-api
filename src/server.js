const { app } = require("./app");
const { AppDatasource } = require("./data-source");

AppDatasource.initialize().then(() => {
  console.log("> Database started");

  app.listen(3000, () => {
    console.log("> Api started");
  });
});
