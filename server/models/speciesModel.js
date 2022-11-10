const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imgsURL: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["fauna", "flora"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Species", speciesSchema);
