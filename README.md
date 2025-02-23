# Nostalgic Fever

Nostalgic Fever is a web platform that allows users to create and store digital time capsules containing text, images, and videos. With features like public and private capsules, chat functionality, gamification through a leaderboard, sentiment analysis, and blockchain security, Nostalgic Fever provides a unique way to preserve and relive memories.

## 🌟 Features

### 🎭 Time Capsules
- Users can create and store time capsules containing **text, images, and videos**.
- Capsules can be marked as **public** (visible to all) or **private** (accessible only to the user).
- Capsules have an **unlock date**, allowing users to open them at a specified time in the future.

### 💬 Chat Functionality
- Users can chat with each other, share memories, and interact with public time capsules.

### 🏆 Gamification & Leaderboard
- Users earn points based on their engagement with time capsules.
- A **leaderboard** ranks users based on likes, comments, and streaks.

### 🤖 Sentiment Analysis
- Built-in **sentiment analysis** automatically tags images and videos with emotions.
- Users can get an emotional summary of their stored content.

### 🔗 Blockchain Security
- Blockchain integration ensures that stored images cannot be tampered with.
- Each image's hash is stored on **Ethereum Sepolia Testnet**, ensuring authenticity.
- If an image is altered, the system detects changes and flags them.

### 📞 Contact Us
- Users can submit queries and get support through the **Contact Us** section.

## 🚀 Getting Started

### 🔧 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (for storing user and capsule data)
- **Ethereum Wallet** (for blockchain integration, e.g., MetaMask)

### 📥 Installation

#### 1️⃣ Clone the repository:
```sh
git clone https://github.com/akshatidk29/nostalgic-fever.git
cd nostalgic-fever
```

#### 2️⃣ Install dependencies:
```sh
npm install  # For frontend and backend
```

#### 3️⃣ Set up environment variables:
Create a `.env` file in the root directory and add the required values:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_CONFIG=your_firebase_config
ETHEREUM_RPC_URL=your_rpc_url
```

#### 4️⃣ Start the application:
```sh
npm run dev
```

## 📌 Usage Guide

### 📝 Creating a Time Capsule
1. Sign up and log in to your account.
2. Click on **Create Capsule**.
3. Add **text, images, or videos**.
4. Set a **title, unlock date, and privacy setting**.
5. Click **Save** to store your capsule.

### 🔍 Viewing Capsules
- Visit the **Timeline** to browse public and private capsules.
- Search and filter based on **date, tags, or sentiment**.

### 📈 Checking Leaderboard
- Go to **Leaderboard** to see top users ranked by their **engagement points**.

### 🛡️ Blockchain Verification
- Every uploaded image has its **hash stored on Ethereum**.
- The system verifies hashes when an image is accessed.
- If tampering is detected, an **alert** is triggered.

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React + Vite** | Frontend |
| **Node.js + Express** | Backend |
| **MongoDB** | Database |
| **Firebase** | Authentication & Hosting |
| **Three.js** | 3D Animations |
| **Framer Motion** | UI Animations |
| **Ethereum (Sepolia Testnet)** | Blockchain Security |
| **Google Vision API** | Sentiment Analysis |

## 🛠️ Future Enhancements
- **AI-powered memory suggestions**
- **Augmented Reality (AR) integration**
- **More blockchain networks for decentralized storage**

## 🤝 Contributing
1. **Fork the repository**.
2. **Create a new branch** (`feature-branch`).
3. **Commit your changes** (`git commit -m 'Add new feature'`).
4. **Push to the branch** (`git push origin feature-branch`).
5. **Submit a pull request**.

## 📞 Contact & Support
For support or questions, reach out via:
- **Email**: support@nostalgicfever.com
- **GitHub Issues**: [Report an issue](https://github.com/akshatidk29/nostalgic-fever/issues)

---

✨ **Nostalgic Fever – Relive Memories, One Frame at a Time!**