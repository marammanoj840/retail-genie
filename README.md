# Retail-Genie - AI-Powered Hyper-Personalized Shopping

A full-stack, AI-powered web application providing hyper-personalized shopping experiences, acting as a virtual stylist. Built for a hackathon demo.

## Features Included
1. **AI Stylist Chatbot**: Integrated Gemini via `@google/genai` to provide styling advice and product recommendations.
2. **Product Recommendation System**: Displays curated styles.
3. **Sentiment Analysis & Buy/Skip Decision Engine**: Recommends BUY/SKIP based on mock historical review sentiments, price, and product ratings.
4. **Mock Price Comparison**: Compares the product price against Amazon, Flipkart, and Myntra.
5. **Virtual Try-On**: A real-time 2D UI simulation for uploading user photos and overlaying products with drag-and-drop approximations.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, React Router, Lucide React
- **Backend**: Node.js, Express.js, Mongoose
- **AI Integration**: Gemini API (`@google/genai` SDK)

## How to Run

### Prerequisites
- Node.js installed.
- (Optional) MongoDB running locally on `mongodb://127.0.0.1:27017` or update the `.env` file with a remote string.
  *Note: The app has a mock-data fallback mechanism. It will run without MongoDB!*
- A Gemini API Key for the chatbot. Update the `server/.env` file.

### Installation & Execution

1. **Install Dependencies** (from the root directory):
   ```bash
   npm run install-all
   ```

2. **Seed Database** (Optional, requires MongoDB):
   ```bash
   npm run seed
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```
   This will run both the frontend and backend servers concurrently.

- The Frontend will be available at `http://localhost:5173/`
- The Backend will be available at `http://localhost:5000/`

Enjoy Retail-Genie!
