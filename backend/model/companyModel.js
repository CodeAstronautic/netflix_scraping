const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    logoUrl: { type: String },
    facebookUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    instagramUrl: { type: String },
    address: { type: String },
    backgroundUrl: { type: String },
    webHomePageImage: { type: String },
    webUrl: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
