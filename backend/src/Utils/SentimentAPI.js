import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// ✅ Map Hugging Face labels to human-readable sentiment
const sentimentMapping = {
    "LABEL_0": "negative",
    "LABEL_1": "neutral",
    "LABEL_2": "positive"
};

export const analyzeSentiment = async (text) => {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: text })
        });

        // Log raw response (debugging)
        const result = await response.json();

        if (!Array.isArray(result) || result.length === 0 || !Array.isArray(result[0]) || result[0].length === 0) {
            console.error("❌ Invalid API Response:", result);
            return { sentiment: "neutral", confidence: 0.5 };
        }

        const sentimentData = result[0][0]; // Extract first result safely

        return {
            sentiment: sentimentMapping[sentimentData.label] || "neutral", // Convert label
            confidence: sentimentData.score
        };

    } catch (error) {
        console.error("❌ Error analyzing sentiment:", error);
        return { sentiment: "neutral", confidence: 0.5 };
    }
};
