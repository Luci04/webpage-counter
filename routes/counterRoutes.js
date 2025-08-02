const express = require('express');
const router = express.Router();
const Counter = require('../models/Counter');

router.get('/test', async (req, res) => {

    try {
        res.json({ message: "Server is Running" });
    } catch (err) {
        res.status(500).json({ error: 'Failed to increment counter' });
    }
});

// Increment counter
router.get('/up/:siteId', async (req, res) => {
    const { siteId } = req.params;

    try {
        const counter = await Counter.findOneAndUpdate(
            { siteId },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        res.json({ siteId, count: counter.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to increment counter' });
    }
});

// Decrement counter
router.get('/down/:siteId', async (req, res) => {
    const { siteId } = req.params;

    try {
        const counter = await Counter.findOneAndUpdate(
            { siteId },
            { $inc: { count: -1 } },
            { new: true, upsert: true }
        );
        res.json({ siteId, count: counter.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to decrement counter' });
    }
});

// Reset counter
router.get('/reset/:siteId', async (req, res) => {
    const { siteId } = req.params;

    try {
        const counter = await Counter.findOneAndUpdate(
            { siteId },
            { count: 0 },
            { new: true, upsert: true }
        );
        res.json({ siteId, count: counter.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to reset counter' });
    }
});

// Get counter
router.get('/:siteId', async (req, res) => {
    const { siteId } = req.params;

    try {
        const counter = await Counter.findOne({ siteId });
        res.json({ siteId, count: counter?.count || 0 });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get counter' });
    }
});

module.exports = router;
