const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ],
    })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })

});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ],
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(404).json(err);
  })
});

router.post("/", (req, res) => {
  // create a new category
    /* expects = req.body to be
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Category.create({
    category_name: req.body.category_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagsIds: req.body.tag_id
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err);
  })
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
