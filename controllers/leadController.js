const mongoose = require('mongoose');
const Lead = require('../models/Lead');

// @desc    Create a new lead
// @route   POST /api/leads
const createLead = async (req, res) => {
  try {
    const { name, email, projectType, budget } = req.body || {};

    if (!name || !email || !projectType) {
      return res.status(400).json({
        message: 'Missing required fields: name, email, and projectType are required',
      });
    }

    const lead = await Lead.create({
      name,
      email,
      projectType,
      budget,
    });

    return res.status(201).json(lead);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all leads sorted by createdAt descending
// @route   GET /api/leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a lead by ID
// @route   DELETE /api/leads/:id
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  deleteLead,
};
