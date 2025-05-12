const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY)

const router = express.Router();

router.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.skillName,
          },
          unit_amount: req.body.skillPrice,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/learnskills?boughtSkill=" + req.body.skillId + "&user=" + req.body.userId,
    cancel_url: "http://localhost:5173/learnskills",
  });

  res.status(200).send(session.url);
});

module.exports = router;
