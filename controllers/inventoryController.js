const {
  getAllCategories,
  getAllItems,
  getCategoryItems,
  insertCategory,
  insertItem,
} = require("../db/queries");

async function displayAllCategories(req, res) {}

async function displayAllItems(req, res) {}

async function displayCategoryItems(req, res) {}

function addCategory(req, res) {
  res.render("addCategory", { title: "New Category" });
}

function addItem(req, res) {
  res.render("addItem", { title: "New Item" });
}

async function postCategory(req, res) {}

async function postItem(req, res) {}

module.exports = {
  displayAllCategories,
  displayAllItems,
  displayCategoryItems,
  addCategory,
  addItem,
  postCategory,
  postItem,
};
