const pool = require("./pool");

async function getAllCategories() {
  try {
    console.log("Running query to fetch categories...");
    const result = await pool.query("SELECT * FROM categories ORDER BY name");

    return result.rows;
  } catch (error) {
    console.error("Error in querying pool getallCategories:", error.message);
    throw error;
  }
}

async function getAllItems() {
  console.log("Running query to fetch all items");
  const result = await pool.query("SELECT * FROM items ORDER BY name");
  return result.rows;
}

async function getCategoryItems(categoryID) {
  console.log("Running query to fetch categories...");
  const result = await pool.query(
    `SELECT items.id, items.name, items.quantity, categories.name AS category_name 
        FROM items 
        JOIN item_category ON items.id = item_category.item_id
        JOIN categories ON item_category.category_id = categories.id
        WHERE categories.id = $1`,
    [categoryID]
  );

  return result.rows;
}

async function insertCategory(categoryName) {
  const query = "INSERT INTO categories (name) VALUES ($1)";
  console.log(query);
  await pool.query(query, [categoryName]);
}

async function insertItem(itemName, quantity, categories) {
  //insert items but grab id of insertion
  // to put into relational table
  //typically inserts return nothing
  // we make it return
  //   [
  //     {
  //       "id": 123
  //     }
  //   ]
  const query = "INSERT INTO items (name,quantity) VALUES ($1,$2) RETURNING id";
  console.log(query);
  const result = await pool.query(query, [itemName, quantity]);
  const itemID = result.rows[0].id;

  const insertItemRelational =
    "INSERT INTO item_category (item_id,category_id) VALUES ($1,$2)";

  //option value= returns an array of ids we need to loop over
  // for (const of array) to get values instead of indexes in js
  for (const categoryId of categories) {
    await pool.query(insertItemRelational, [itemID, categoryId]);
  }
}

module.exports = {
  getAllCategories,
  getAllItems,
  getCategoryItems,
  insertCategory,
  insertItem,
};
