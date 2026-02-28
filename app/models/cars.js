const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        make: {
            type: String,
            required: 'Make is required',
            trim: true
        },
        model: {
            type: String,
            required: 'Model is required',
            trim: true
        },
        year: {
            type: Number,
            required: 'Year is required'
        },
        kilometers: Number,
        doors: Number,
        seats: Number,
        color: String,
        price: Number,
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "cars"
    }
);

// Ensure virtual fields are serialised.
CarSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Car", CarSchema);
// Get a single car by ID
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car by ID
exports.updatecar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};