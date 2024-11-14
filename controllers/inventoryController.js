const {
  getAllCategories,
  getAllItems,
  getCategoryItems,
  insertCategory,
  insertItem,
} = require("../db/queries");

async function displayAllCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.render("index", { title: "Invetory Main Menu", categories });
  } catch (error) {
    res.status(500).send("Error fetching categories for homepage");
  }
}

async function displayAllItems(req, res) {
  try {
    const items = await getAllItems();
    res.render("items", { title: "All Items", items });
  } catch (error) {
    res.status(500).send("Error fetching all inventory items");
  }
}

async function displayCategoryItems(req, res) {
  try {
    const categoryContent = await getCategoryItems();
    res.render("categoryIndex", { title: "Category Items", categoryContent });
  } catch (error) {
    res.status(500).send("Error fetching categories items");
  }
}

function addCategory(req, res) {
  res.render("addCategory", { title: "New Category" });
}

function addItem(req, res) {
  res.render("addItem", { title: "New Item" });
}

async function postCategory(req, res) {
  const { categoryName } = req.body;
  try {
    await insertCategory(categoryName);
  } catch (error) {
    res.status(500).send("Error posting new category");
  }
}

async function postItem(req, res) {
  const { itemName, quantity, categories } = req.body;
  try {
    await insertItem(itemName, quantity, categories);
  } catch (error) {
    res.status(500).send("Error posting new item");
  }
}

module.exports = {
  displayAllCategories,
  displayAllItems,
  displayCategoryItems,
  addCategory,
  addItem,
  postCategory,
  postItem,
};
