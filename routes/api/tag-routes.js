const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ 
      model: Product, 
      through: { 
        model: ProductTag, 
        attributes: [] 
      },
      attributes: ["id", "product_name"]
    }]})
    .then(data => res.json(data))
    .catch(err => {});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include: [{ 
      model: Product, 
      through: { 
        model: ProductTag, 
        attributes: [] 
      },
      attributes: ["id", "product_name"]
    }]})
    .then(data => res.json(data))
    .catch(err => {});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({tag_name : req.body.tag_name})
  .then(data => res.json(data))
  .catch(err => {});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({tag_name : req.body.tag_name},{where: {id: [req.params.id]}})
  res.status(200).json(req.body)
  .catch(err => {});
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({where: {id: req.params.id,}});
    res.status(200).json({ message: "tag deleted"});
  } catch (error) {
    res.status(400).json(error);
  }});

module.exports = router;
