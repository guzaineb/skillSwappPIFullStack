const express = require("express");
const stripe = require("stripe")("sk_test_51RC1e92YmKQOUwo1i45lmWrsS1mFQDEzoLYjXUVlrsZxh9fTV9xM5n0imi2XM7dVsQNSAvzxflQ5hBbT8CisXVzt00y8j6q2Ip")

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
    success_url: "http://localhost:5173/skills?boughtSkill=" + req.body.skillId + "&user=" + req.body.userId,
    cancel_url: "http://localhost:5173/skills",
  });

  res.status(200).send(session.url);
});

module.exports = router;
