const {
  getAllCategoriesQuery,
  getAllItemsQuery,
  getCategoryItemsQuery,
  insertCategoryQuery,
  insertItemQuery,
  getUnsortedQuery,
} = require("../db/queries");

async function displayAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesQuery();
    res.render("index", { title: "Inventory Main Menu", categories });
  } catch (error) {
    console.error("Error fetching homepage:", error.message);
    res.status(500).send("Error fetching categories for homepage");
  }
}

//feed delete function into this function
//so button can execute deleteItemQuery
async function displayAllItems(req, res) {
  try {
    const items = await getAllItemsQuery();
    res.render("items", { title: "All Items", items });
  } catch (error) {
    res.status(500).send("Error fetching all inventory items");
  }
}

async function displayCategoryItems(req, res) {
  const categoryID = req.params.id;
  console.log("Category ID from URL:", categoryID);
  try {
    const categoryItems = await getCategoryItemsQuery(categoryID);
    console.log(categoryItems);
    const categoryName =
      categoryItems.length > 0 ? categoryItems[0].category_name : "Empty";
    res.render("categoryIndex", {
      title: `${categoryName} Category`,
      categoryItems,
    });
  } catch (error) {
    console.error("Error fetching category items:", error.message);
    res.status(500).send("Error fetching categories items");
  }
}

function addCategory(req, res) {
  res.render("addCategory", { title: "New Category" });
}

async function addItem(req, res) {
  //we need to fetch the categories for the <select> html element
  try {
    const categories = await getAllCategoriesQuery();
    res.render("addItem", { title: "New Item", category: categories });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).send("Error fetching categories for addItem");
  }
}

async function postCategory(req, res) {
  const { categoryName } = req.body;
  try {
    await insertCategoryQuery(categoryName);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error posting new category");
  }
}

async function postItem(req, res) {
  const { itemName, quantity, category } = req.body;
  console.log("Categories from form:", category);
  try {
    await insertItemQuery(itemName, quantity, category);
    res.redirect("/");
  } catch (error) {
    console.error("Error posting new item:", error.message);
    res.status(500).send("Error posting new item");
  }
}

async function getUnsortedItems(req, res) {
  try {
    const unsorted = await getUnsortedQuery();

    res.render("unsorted", { title: "Unsorted Items", unsorted });
  } catch (error) {
    console.error("Error fetching orphans from query:", error.message);
    res.status(500).send("Error fetching unsorted items");
  }
}

//controller exports
module.exports = {
  displayAllCategories,
  displayAllItems,
  displayCategoryItems,
  addCategory,
  addItem,
  getUnsortedItems,
  postCategory,
  postItem,
};
