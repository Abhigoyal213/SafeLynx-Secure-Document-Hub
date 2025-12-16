
const Document = require('../models/Document');

const getStorageUsage = async (req, res) => {
    try {
        const ownershipQuery = {
            $or: [
                { uploadedBy: req.user._id },
                { sharedWith: req.user._id }
            ]
        };

        const result = await Document.aggregate([
            { $match: ownershipQuery },
            { $group: { _id: null, totalSize: { $sum: '$fileSize' } } }
        ]);

        const usedBytes = result.length > 0 ? result[0].totalSize : 0;
        const totalBytes = 3 * 1024 * 1024 * 1024; // 3GB limit

        return res.json({
            used: usedBytes,
            total: totalBytes
        });
    } catch (err) {
        return res.status(500).json({ message: 'Unable to fetch storage usage', error: err.message });
    }
};

module.exports = {
    getStorageUsage
};
