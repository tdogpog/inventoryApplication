const { Router } = require("express");

const inventoryRouter = Router();

inventoryRouter.get("/", displayAllCategories);

inventoryRouter.get("/items", displayAllItems);

inventoryRouter.get("/categories/:id", displayCategory);

inventoryRouter.get("/addCategory", addCategory);

inventoryRouter.get("/addItem", addItem);

inventoryRouter.post("/addCategory", postCategory);

inventoryRouter.post("/addItem", postItem);

module.exports = inventoryRouter;
