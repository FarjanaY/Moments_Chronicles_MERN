//External Imports
const express = require("express");

//Internal imports
const {
  addCatagory,
  getAllCatagory,
  getOneCatagory,
  updateCatagory,
  deleteCatagory,
} = require("../controllers/catagory.controller");

//create catagoryRouter
const catagoryRouter = express.Router();

//All Routes
//route : http://localhost:8000/api/catagory/add
catagoryRouter.post("/add", addCatagory);

//route: http://localhost:8000/api/catagory/
catagoryRouter.get("/", getAllCatagory);

//route : http://localhost:8000/api/catagory/:id
catagoryRouter.get("/:id", getOneCatagory);

//route : http://localhost:8000/api/catagory/update/:id
catagoryRouter.put("/update/:id", updateCatagory);

//route : http://localhost:8000/api/catagory/delete/:id
catagoryRouter.delete("/delete/:id", deleteCatagory);

module.exports = catagoryRouter;
