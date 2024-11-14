const { Router } = require("express");

const {
  displayAllCategories,
  displayAllItems,
  displayCategoryItems,
  addCategory,
  addItem,
  postCategory,
  postItem,
} = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", displayAllCategories);

inventoryRouter.get("/items", displayAllItems);

inventoryRouter.get("/category/:id", displayCategoryItems);

inventoryRouter.get("/addCategory", addCategory);

inventoryRouter.get("/addItem", addItem);

inventoryRouter.post("/addCategory", postCategory);

inventoryRouter.post("/addItem", postItem);

module.exports = inventoryRouter;
