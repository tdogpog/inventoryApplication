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
    res.render("index", { title: "Inventory Main Menu", categories });
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
  const categoryID = req.params.id;
  try {
    const categoryContent = await getCategoryItems(categoryID);
    const categoryName =
      categoryContent.length > 0
        ? categoryContent[0].category_name
        : "Unknown Category";
    res.render("categoryIndex", {
      title: `Items in ${categoryName}`,
      categoryContent,
    });
  } catch (error) {
    console.error("Error fetching category items:", error.message);
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
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error posting new category");
  }
}

async function postItem(req, res) {
  const { itemName, quantity, categories } = req.body;
  try {
    await insertItem(itemName, quantity, categories);
    res.redirect("/");
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
