import app from "./app";
import AppDatasource from "./data-source";

AppDatasource.initialize().then(() => {
  console.log("> Database started");

  app.listen(3000, () => {
    console.log("> Api started");
  });
});
