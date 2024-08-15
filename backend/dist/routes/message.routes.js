import express from "express";
const router = express.Router();
router.get('/conversation', (req, res) => {
    res.send({ message: 'Messages endpoint successful' });
});
export default router;
