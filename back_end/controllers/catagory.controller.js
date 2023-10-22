//Internal Imports
const Catagory = require("../models/catagory.model");

/*==================================================================
desc : Create Catagory
route : http://localhost:8000/api/catagory/add
method: POST
====================================================================*/
const addCatagory = async (req, res) => {
  const newCat = new Catagory(req.body);
  try {
    const savedCatagory = await newCat.save();
    if (savedCatagory) {
      res.status(200).json({
        result: "successful",
        message: "New Catagory saved successfully.",
        savedCatagory,
      });
    } else {
      res.status(404).json({
        result: "unsuccessful",
        message: "Catagory can't be saved.",
      });
    }
  } catch (error) {
    res.status(500).json({
      result: "unsuccessful",
      message: "Error!!! Server Error.",
      error: error.message,
    });
  }
};
/*==================================================================
desc : Find all Catagory
route : http://localhost:8000/api/catagory/
method: GET 
====================================================================*/
const getAllCatagory = async (req, res) => {
  try {
    const catagories = await Catagory.find();
    if (catagories) {
      res.status(200).json({
        result: "successful",
        message: "Catagories are found",
        total: catagories.length,
        catagories,
      });
    } else {
      res.status(404).json({
        result: "unsuccessful",
        message: "No catagory is available..",
      });
    }
  } catch (error) {
    res.status(500).json({
      result: "unsuccessful",
      message: "Error!!! Server Error.",
      error: error.message,
    });
  }
};

/*==================================================================
desc : Find one Catagory
route : http://localhost:8000/api/catagory/:id
method: GET   
====================================================================*/
const getOneCatagory = (req, res) => {
  res.status(200).send(" get One catagory");
};

/*==================================================================
desc : Update/Edit Catagory
route : http://localhost:8000/api/catagory/update/:id
method: PUT   
====================================================================*/
const updateCatagory = (req, res) => {
  res.status(200).send(" update catagory");
};

/*==================================================================
desc : Delete Catagory
route : http://localhost:8000/api/catagory/delete/:id
method: DELETE   
====================================================================*/
const deleteCatagory = (req, res) => {
  res.status(200).send(" delete catagory");
};

module.exports = {
  addCatagory,
  getAllCatagory,
  getOneCatagory,
  updateCatagory,
  deleteCatagory,
};
