const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  deleteLead,
} = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads);
router.delete('/:id', deleteLead);

module.exports = router;
