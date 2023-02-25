const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
  include: [{ model: Product }]})
  .then(data => res.json(data))
  .catch(err => {});
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include: [{ model: Product }]})
  .then(data => res.json(data))
  .catch(err => {});
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name : req.body.category_name})
  .then(data => res.json(data))
  .catch(err => {});
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name : req.body.category_name},{where: {id: [req.params.id]}})
  res.status(200).json(req.body)
  .catch(err => {});
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({where: {id: req.params.id,}});
    res.status(200).json({ message: "Category deleted"});
  } catch (error) {
    res.status(400).json(error);
  }});


module.exports = router;
