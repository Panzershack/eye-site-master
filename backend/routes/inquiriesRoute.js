import express from 'express';
import { inquiry } from '../models/inquiryModel.js';

const router = express.Router();

router.use(express.json());

// Route for save a new Inquiry
router.post('/', async (req, res) => {
    try {
        const { Email, Type, Text } = req.body;

        if (!Email || !Type || ! Text) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        }

        const newInquiry = new inquiry({
            Email,
            Type,
            Text,
        });

        const savedInquiry = await newInquiry.save();

        return res.status(201).send(savedInquiry);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for get all Inquiry
router.get('/', async (req, res) => {
    try {
        const inquiries = await inquiry.find({});
        return res.status(200).json({
            count: inquiries.length,
            data: inquiries,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for get a Inquiry by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const inquiryData = await inquiry.findById(id);
        if (!inquiryData) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        return res.status(200).json(inquiryData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for update 
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Email, Type, Text } = req.body;

        if (!Email || !Type || !Text) {
            return res.status(400).send({ message: 'Please fill all the fields' });
        }

        const updatedInquiry = await inquiry.findByIdAndUpdate(id, { Email, Type, Text }, { new: true });

        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        return res.status(200).send(updatedInquiry);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for delete an inquiry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInquiry = await inquiry.findByIdAndDelete(id);

        if (!deletedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        return res.status(200).send({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
