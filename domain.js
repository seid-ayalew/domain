const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_STRIPE_SECRET_KEY');
const app = express();

app.use(express.json());

app.post('/charge', async (req, res) => {
    try {
        const {amount, token, currency} = req.body;
        
        const charge = await stripe.charges.create({
            amount: amount,
            currency: currency,
            source: token,
            description: 'Domain registration funding'
        });

        res.json({success: true});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));