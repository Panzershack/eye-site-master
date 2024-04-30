import express from 'express';
import { employee } from '../models/employeeModel.js';

const router = express.Router();

//Route for save a new employee
router.post('/', async(req, res) => {
    try {
        if (!req.body.firstName ||
            !req.body.lastName ||
            !req.body.position ||
            !req.body.telephone ||
            !req.body.address
        ) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        };
        const newEmployee = new employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            telephone: req.body.telephone,
            address: req.body.address
        });

        const savedEmployee = await newEmployee.save(); // Changed from employee.create to newemployee.save

        return res.status(201).send(savedEmployee); // Changed from response to res

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for get all employees
router.get('/', async(req, res) => {
    try {
        const employees = await employee.find({});
        return res.status(200).json({
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//Route for get a employees by id
router.get('/:id', async(req, res) => {
    try {

        const { id } = req.params;
        const employees = await employee.findById(id);
        return res.status(200).json(employees);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route for update a employee
router.put('/:id', async(req, res) => {
    try {
        if (!req.body.firstName ||
            !req.body.lastName ||
            !req.body.position ||
            !req.body.telephone ||
            !req.body.address
        ) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        };

        const { id } = req.params;

        const result = await employee.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'employee not found' });
        }
        return res.status(200).send({ message: 'employee updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.mesasage });
    }
});

//Route for delete a employee
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await employee.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'employee not found' });
        }
        return res.status(200).send({ message: 'employee deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;