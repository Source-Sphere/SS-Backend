const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // used for optimised searching but expensive operation
    },
    orgURL: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Org = mongoose.model("Org", orgSchema);

module.exports = Org;
