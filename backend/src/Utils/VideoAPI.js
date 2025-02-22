import videoIntelligence from "@google-cloud/video-intelligence";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Explicitly provide the credentials file
const client = new videoIntelligence.VideoIntelligenceServiceClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const analyzeVideo = async (videoUrl) => {
    try {
        const request = {
            inputUri: videoUrl,
            features: ["LABEL_DETECTION"]
        };

        const [operation] = await client.annotateVideo(request);
        const [result] = await operation.promise();

        const shotLabels = result.annotationResults[0].segmentLabelAnnotations.map(label => ({
            label: label.entity.description
        }));

        const description = shotLabels.length > 0 ? `This video contains ${shotLabels.slice(0, 3).map(l => l.label).join(", ")}` : "No description available.";

        return { description, shotLabels };

    } catch (error) {
        console.error("Error analyzing video:", error);
        return { description: "Error analyzing video.", shotLabels: [] };
    }
};
