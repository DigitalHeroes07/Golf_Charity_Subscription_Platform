# ImpactGolf: Charity Subscription Platform

Welcome to ImpactGolf! This is a modern, premium web application built with Next.js that tracks user golf scores, manages monthly subscription tiers for charitable contributions, and runs automated monthly prize draws.

## 🚀 Getting Started

Follow these simple steps to clone the project and run it on your local machine.

### 1. Clone the Repository
Open your terminal and clone the repository:
```bash
git clone https://github.com/DigitalHeroes07/Golf_Charity_Subscription_Platform.git
cd Golf_Charity_Subscription_Platform
```

### 2. Install Dependencies
Make sure you have Node.js installed. Then, install all the required packages:
```bash
npm install
```

### 3. Setup Environment Variables
You will need to connect the app to Supabase (Database/Auth) and Stripe (Payments). 
Create a file named `.env.local` in the root directory of the project and paste your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
*(Tip: You can find a `supabase/migrations/0000_schema.sql` file in this repository. Just copy and paste it into your Supabase SQL Editor to instantly build the database tables!)*

### 4. Run the Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

---

### ✨ Key Technical Features
* **Stripe Subscriptions**: Seamless Monthly and Yearly membership tiers mirroring real-world checkout sessions.
* **Golfer Dashboard**: Log authentic Stableford scores, track activity history dynamically, and check upcoming draw eligibility perfectly mapped to SSR logic.
* **Charity Directory**: Select and allocate minimum 10% of subscription fees to specific charities through the interactive UI.
* **Prize Draws**: Simulated 40/35/25 split prize pooling and native KYC verification uploads.
