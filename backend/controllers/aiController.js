const db = require("../config/db");
const axios = require("axios");



const chatAI = (req, res) => {


  const { message } = req.body;

  const sql = `
    SELECT
      phones.model,
      brands.name AS brand,
      phones.price,
      phones.processor,
      phones.ram,
      phones.storage,
      phones.camera,
      phones.battery,
      phones.display_screen,
      phones.os
    FROM phones
    INNER JOIN brands
      ON phones.brand_id = brands.id
  `;

  db.query(sql, async (err, phones) => {

    if (err) {
      return res.status(500).json({
        reply: "Database Error",
      });
    }

    try {

      const prompt = `
You are CellSense AI.

You ONLY answer smartphone questions.

These are the phones in my database:

${JSON.stringify(phones)}

Only recommend phones from this list.

User:
${message}
`;

const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "system",
        content:
          "You are CellSense AI. Only answer smartphone questions using the provided phone database.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  },
  {
    headers: {
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
  "HTTP-Referer": "http://localhost:3000",
  "X-Title": "CellSense AI",
},
  }
);

return res.json({
  reply: response.data.choices[0].message.content,
});

    } catch (e) {

    console.log("========== OPENROUTER ERROR ==========");

    console.log("Status:", e.response?.status);

    console.log("Data:", JSON.stringify(e.response?.data, null, 2));

    console.log("======================================");

    return res.status(e.response?.status || 500).json(
        e.response?.data || {
            message: e.message
        }
    );

}
  });

};
const recommendAI = async (req, res) => {

    const {
        budget,
        brand,
        camera,
        gaming,
        battery
    } = req.body;

    try {

        const prompt = `
Bạn là chuyên gia smartphone.

Ngân sách:
${budget}

Hãng:
${brand || "Bất kỳ"}

Camera:
${camera}/5

Gaming:
${gaming}/5

Pin:
${battery}/5

Hãy đề xuất 3 điện thoại phù hợp.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`
                }
            }
        );

        res.json({
            reply: response.data.choices[0].message.content
        });

    } catch (err) {

        console.log(err.response?.data);

        res.status(500).json({
            message: "AI Error"
        });

    }

};

module.exports = {
  chatAI,
  recommendAI
};