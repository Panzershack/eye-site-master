import express from 'express';
import { item } from '../models/itemModel.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.price ||
            !req.body.company ||
            !req.body.colour ||
            !req.body.category ||
            !req.body.description ||
            !req.body.image
        ){
            return res.status(400).send({message: 'Please fill all the fields'});
        };

        // Create a new item object with the provided data
        const newItem = new item({
            title: req.body.title,
            price: req.body.price,
            company: req.body.company,
            colour: req.body.colour,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image,
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        // Send the saved item in the response
        return res.status(201).send(savedItem);
    } catch (error) {
        console.log(error.message);
        // If an error occurs, send an error response
        res.status(500).send({ message: error.message });
    }
});
// Other routes remain the same...


//Route for get all Items
router.get('/', async (req, res) => {
    try {
        const items = await item.find({});
        return res.status(200).json({
            count: items.length,
            data: items,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


//Route for get a Items by id
router.get('/:id', async (req, res) => {
    try {

        const{ id } = req.params;
        const foundItem = await item.findById(id);
        return res.status(200).json(foundItem);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for update a item
router.put('/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.price ||
            !req.body.company ||
            !req.body.colour ||
            !req.body.category ||
            !req.body.description ||
            !req.body.image
        ){
            return res.status(400).send({message: 'Please fill all the fields'});
        };
    
        const{ id } = req.params;

        const result = await item.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: 'Item not found'});
        }
        return res.status(200).send({message: 'Item updated successfully'});
     } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.mesasage});
    }
});

//Route for delete a item
router.delete('/:id', async (req, res) => {
    try {
        const{ id } = req.params;
        const result = await item.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Item not found'});
        }
        return res.status(200).send({message: 'Item deleted successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;