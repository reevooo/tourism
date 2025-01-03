import Destination from "../../../db/models/TouristDestinations.model.js";

// GET: جلب كل الوجهات السياحية
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: جلب وجهة سياحية حسب الـ ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: إضافة وجهة سياحية جديدة
export const createDestination = async (req, res) => {
  const { name, description, category, location, images, openingHours, entryFee } = req.body;

  const newDestination = new Destination({
    name,
    description,
    category,
    location,
    images,
    openingHours,
    entryFee,
  });

  try {
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT: تحديث وجهة سياحية حسب الـ ID
export const updateDestination = async (req, res) => {
    const allowedUpdates = ['name', 'description', 'category', 'location', 'images', 'openingHours', 'entryFee', 'ratings']; // الحقول المسموح بتعديلها
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }
  
    try {
      const updatedDestination = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // تشغيل الفاليديشن علشان يتأكد إن البيانات المدخلة متوافقة مع الـ schema
      );
      if (!updatedDestination) return res.status(404).json({ message: 'Destination not found' });
      res.status(200).json(updatedDestination);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// DELETE: حذف وجهة سياحية حسب الـ ID
export const deleteDestination = async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
