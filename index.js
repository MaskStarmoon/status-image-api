const express = require("express");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/status", async (req, res) => {
  try {
    const {
      name = "Unknown",
      id = "0000",
      exp = "0",
      money = "0",
      ach = "None"
    } = req.query;

    const bg = await loadImage(
      "https://raw.githubusercontent.com/MaskStarmoon/New-api/refs/heads/main/assets/status/image-api/status-image-done.png"
    );

    const canvas = createCanvas(bg.width, bg.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bg, 0, 0);

    ctx.fillStyle = "#ffffff";
    ctx.font = "32px sans-serif";

    ctx.fillText(name, 160, 150);
    ctx.fillText(id, 160, 200);
    ctx.fillText(exp, 160, 250);
    ctx.fillText(money, 160, 300);
    ctx.fillText(ach, 160, 350);

    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));

  } catch (e) {
    console.error(e);
    res.status(500).send("Render failed");
  }
});

app.listen(PORT, () =>
  console.log("Status Image API running 🚀")
);
