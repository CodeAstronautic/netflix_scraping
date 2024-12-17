const companyService = require("../service/companyService");
const Company = require("../model/companyModel");
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

exports.scrapeAndSaveCompanyData = async (req, res) => {
  try {
    const { url } = req.body;

    // const timeout = setTimeout(() => {
    //   res.status(500).json({ message: 'Request timed out' });
    // }, 10 * 60 * 1000); // Set 

    const companyData = await companyService.scrapeWebsiteData(url);

    // clearTimeout(timeout);

    const existingCompany = await Company.findOne({ name: companyData.name });

    if (existingCompany) {
      return res.status(200).json({
        message: "Company data already exists for this URL",
        data: existingCompany,
      });
    }

    const newCompany = new Company(companyData);
    await newCompany.save();

    return res
      .status(200)
      .json({ message: "Company data saved successfully", data: newCompany });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error scraping or saving data", error: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ data: companies });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving companies", error: err.message });
  }

};

exports.getCompanieById = async (req, res) => {
  try {
    const id = req.params.id;
    const companie = await Company.findOne({_id:id});
    res.status(200).json({ data: companie });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving companies", error: err.message });
  }

}

exports.deleteMultipleCompanies = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Invalid request. Please provide an array of company IDs.",
      });
    }

    const result = await Company.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount == 0) {
      return res.status(404).json({
        message: "No companies found for the provided IDs.",
      });
    }
    return res.status(200).json({
      message: "Companies deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting companies",
      error: err.message,
    });
  }
};

exports.downloadCompaniesCsv = async (req, res) => {
  try {
    const companies = await Company.find();

    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "No companies available to export." });
    }

    const fields = Object.keys(companies[0].toObject());
    const json2csvParser = new Parser({ fields });

    const csv = json2csvParser.parse(companies);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=companies.csv');

    return res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({
      message: "Error generating CSV",
      error: err.message,
    });
  }
};