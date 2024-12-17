const express = require('express');
const companyController = require('../controller/companyController');

const router = express.Router();

router.post('/scrape', companyController.scrapeAndSaveCompanyData);

router.get('/', companyController.getCompanies);

router.get('/export-csv', companyController.downloadCompaniesCsv);

router.delete('/delete-multiple-company', companyController.deleteMultipleCompanies);

router.get('/:id', companyController.getCompanieById);

module.exports = router;