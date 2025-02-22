import vision from "@google-cloud/vision";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Explicitly provide the credentials file
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
});

export const analyzeImage = async (imageUrl) => {
    try {
        const [result] = await client.annotateImage({
            image: { source: { imageUri: imageUrl } },
            features: [{ type: "LABEL_DETECTION" }, { type: "DOCUMENT_TEXT_DETECTION" }]
        });

        const labels = result.labelAnnotations?.map(label => label.description) || [];
        const description = labels.length > 0 ? `This image contains ${labels.slice(0, 3).join(", ")}` : "No description available.";

        return { labels, description };

    } catch (error) {
        console.error("Error analyzing image:", error);
        return { labels: [], description: "Error analyzing image." };
    }
};
