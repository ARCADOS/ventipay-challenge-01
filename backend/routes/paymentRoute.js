const { Router } = require('express')
const { getPaymentById, deletePaymentById, getAllPaymenteWithTypeFilter, createPaymentReport } = require('../controllers/paymentController')

const router = Router()


router.get("/payment_methods", getAllPaymenteWithTypeFilter );

router.get("/payment_methods/details/:id", getPaymentById );

router.get("/payment_methods/export", createPaymentReport );

router.delete("/payment_methods/:id", deletePaymentById);

module.exports = router