import express from 'express';
import { supplier } from '../models/supplierModel.js';

const router = express.Router();

//Route for save a new supplier
router.post('/', async(req, res) => {
    try {
        if (!req.body.supplierName ||
            !req.body.product ||
            !req.body.brand ||
            !req.body.email ||
            !req.body.contactNo
        ) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        };
        const newSupplier = new supplier({
            supplierName: req.body.supplierName,
            product: req.body.product,
            brand: req.body.brand,
            email: req.body.email,
            contactNo: req.body.contactNo
        });

        const savedSupplier = await newSupplier.save(); // Changed from supplier.create to newsupplier.save

        return res.status(201).send(savedSupplier); // Changed from response to res

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for get all suppliers
router.get('/', async(req, res) => {
    try {
        const suppliers = await supplier.find({});
        return res.status(200).json({
            count: suppliers.length,
            data: suppliers,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//Route for get a suppliers by id
router.get('/:id', async(req, res) => {
    try {

        const { id } = req.params;
        const suppliers = await supplier.findById(id);
        return res.status(200).json(suppliers);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for update a supplier
router.put('/:id', async(req, res) => {
    try {
        if (!req.body.supplierName ||
            !req.body.product ||
            !req.body.brand ||
            !req.body.email ||
            !req.body.contactNo
        ) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        };

        const { id } = req.params;

        const result = await supplier.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'supplier not found' });
        }
        return res.status(200).send({ message: 'supplier updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.mesasage });
    }
});

//Route for delete a supplier
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await supplier.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'supplier not found' });
        }
        return res.status(200).send({ message: 'supplier deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;