const express = require("express");
const app = express();
const { cloudinary } = require("./config/cloudinary");
const cors = require("cors");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/api/upload", async (req, res, next) => {
    try {
        const fileStr = req.body.data;

        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: "test",
        });

        console.log(uploadedResponse);

        res.status(201).json({
            status: 200,
            message: "success upload image",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Something went wrong",
        });
    }
});

app.listen(port, () => {
    console.log(`running at PORT: ${port}`);
});
