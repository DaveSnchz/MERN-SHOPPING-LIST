const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Items');

// @route   GET api/items
// @desc    GET All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1 })
    .then(items => res.json(items));
  })

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item)); 
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
      .then(item => {
          if (!item) {
              return res.status(404).json({ success: false, message: 'Item not found' });
          }
          Item.deleteOne({ _id: req.params.id })
              .then(() => res.json({ success: true }))
              .catch(err => res.status(500).json({ success: false, error: err.message }));
      })
      .catch(err => res.status(404).json({ success: false, error: err.message }));
});

module.exports = router;