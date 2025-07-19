import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";


// Initialise Gemini
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


// Initialise the server
const app = express();
const upload = multer({ dest: "uploads/" });


// Serve the front-end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (_, res) => {
	res.sendFile(__dirname + "/index.html");
});


// Send form submissions to Gemini
app.post("/askgemini", upload.single("image"), async (req, res) => {
	try {
		const filePath = req.file.path;
		const mimeType = req.file.mimetype;

		const imageBytes = await fs.promises.readFile(filePath);

		// The maximum image size using inline images is 20MB, otherwise use the File API
		// See https://ai.google.dev/gemini-api/docs/image-understanding
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: [
				{
					inlineData: { 
						mimeType,
						data: imageBytes.toString("base64")
					}
				},
				{
					// Replace with what you want to ask Gemini about the image
					text: "Caption this image."
				}
			]
		});
		
		const answer = response.text;
		console.log(answer);
		res.json({ answer });

		// Clean up uploaded file
		await fs.promises.unlink(filePath);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ error: "Image upload or Gemini API call failed: " + error.message });
	}
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
