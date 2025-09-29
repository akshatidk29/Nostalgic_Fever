# **Nostalgic Fever**  
### PPT Link : https://docs.google.com/presentation/d/1GiPQJgZ3NPplVO3J80nXLUpzgB_YAUPT/edit?usp=drivesdk&ouid=110152811078612518528&rtpof=true&sd=true
### MP4 PPT Link : https://drive.google.com/file/d/10KCAM1kBCQUuuJnAerf5z9YT4TkeVxJ1/view?usp=drivesdk
**Relive Memories, One Frame at a Time!**  

## **Overview**  

Nostalgic Fever is a **web platform** that allows users to **create, store, and share digital time capsules** containing **text, images, and videos**. It includes features like **chat functionality, gamification (leaderboard), sentiment analysis, and blockchain security** to ensure a secure and engaging experience.  

## **Features**  

### **Time Capsules**  
- Users can **store memories** in the form of text, images, and videos.  
- Capsules can be **public** (shared with everyone) or **private** (visible only to the owner).  
- Set an **unlock date**, allowing capsules to be revealed at a future time.  

### **Chat & Community Engagement**  
- Users can **chat with each other** and share their experiences.  
- Interact with public capsules through **likes and comments**.  

### **Leaderboard & Gamification**  
- Users earn points for **creating and engaging** with time capsules.  
- A **leaderboard** ranks users based on activity, including **streaks, likes, and comments**.  

### **Sentiment Analysis (Hugging Face API)**  
- AI-powered **sentiment analysis** tags images with **emotions** (e.g., happy, sad, nostalgic).  
- Users can explore their **memories based on mood**.  

### **Blockchain Security**  
- **Ethereum Sepolia Testnet integration** ensures **image authenticity**.  
- If an image is altered, **the system flags the change**.  

### **Contact & Support**  
- A dedicated **Contact Us** page for queries and support.  

---

## **Tech Stack**  

| Technology         | Purpose                  |  
|-------------------|--------------------------|  
| **React + Vite**  | Frontend UI/UX           |  
| **Node.js + Express** | Backend API & authentication  |  
| **MongoDB**       | Database for users & capsules |  
| **Cloudinary**    | Image & video storage    |  
| **Hugging Face API** | AI-powered sentiment analysis |  
| **Ethereum (Sepolia Testnet)** | Blockchain-based image security |  
| **Three.js**      | 3D animations for an immersive experience |  
| **Framer Motion** | UI animations for smooth interactions |  

---

## **Environment Variables Setup**  

To run **Nostalgic Fever** locally, create a `.env` file in the **root directory** and configure the following variables:  

```env
MONGODB_URI=your_mongodb_connection_string  
PORT=5001  
JWT_SECRET=your_jwt_secret  

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name  
CLOUDINARY_API_KEY=your_cloudinary_api_key  
CLOUDINARY_API_SECRET=your_cloudinary_api_secret  

HUGGING_FACE_API_KEY=your_hugging_face_api_key  

GOOGLE_APPLICATION_CREDENTIALS=/path/to/google-credentials.json  

SEPOLIA_RPC_URL=your_sepolia_rpc_url  
PRIVATE_KEY=your_blockchain_private_key  
CONTRACT_ADDRESS=your_smart_contract_address  

NODE_ENV=development  
```  

### **Steps to Set Up:**  
1. **Create a `.env` file** in the root of your project.  
2. **Replace placeholders** with your actual credentials.  
3. **Ensure your `.env` file is in `.gitignore`** to avoid leaks.  

---

## **Installation & Usage**  

### **1️. Clone the Repository**  
```sh
git clone https://github.com/akshatidk29/Inforger.git  
cd Inforger  
```  

### **2️. Install Dependencies**  
```sh
npm install  
```  

### **3️. Start the Application**  
```sh
npm run dev  
```  

---

## **Challenges We Ran Into**  

1. **Blockchain Image Hashing** – Ensuring images remain **tamper-proof** using Ethereum required **multiple verification steps** to prevent mismatch errors. We resolved this by implementing **hash comparison at access time**.  
2. **Real-Time Sentiment Analysis** – Integrating **Hugging Face API** into the system while maintaining **fast response times** was a challenge. We optimized by **pre-caching results** where possible.  
3. **Optimizing Three.js Animations** – The **initial 3D animations** were slowing down performance. We **optimized rendering** and used **GPU-based acceleration** to improve the experience.  

---

## **How It Fits into WebDev Track**  

Nostalgic Fever is a **full-stack web application** built with **modern web technologies**. It combines:  
- **Frontend (React, Vite, Tailwind CSS)** for a fast, interactive user experience.  
- **Backend (Node.js, Express, MongoDB)** for authentication, data storage, and API management.  
- **Blockchain (Ethereum Sepolia Testnet)** to ensure **data integrity** for images.  
- **AI (Hugging Face API)** to analyze and categorize content dynamically.  

This project showcases a **seamless combination of Web Development, AI, and Blockchain** to solve a **real-world memory preservation problem**.  

---

## **Contributing**  

Want to contribute? Follow these steps:  

1. **Fork the repository**.  
2. **Create a new branch** (`feature-branch`).  
3. **Commit your changes** (`git commit -m "Added new feature"`).  
4. **Push to the branch** (`git push origin feature-branch`).  
5. **Submit a Pull Request** for review.  

---

## **Contact & Support**  

- **Email**: support@nostalgicfever.com  
- **GitHub Issues**: [Report an issue](https://github.com/akshatidk29/nostalgic-fever/issues)  

---

**Nostalgic Fever – Relive Memories, One Frame at a Time!**  

---

