# SwiftSend 🚀

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

**SwiftSend** is a premium, secure, and lightning-fast file-sharing platform. Built with Next.js, Firebase, and Cloudinary, it allows users to upload single or batch files, protect them with custom passwords, and share generated short links directly via beautiful email templates.

---

## ✨ Features

- 📂 **Multi-file Batch Uploads** – Drag and drop multiple files to upload them simultaneously.
- ⚡ **Global CDN Delivery** – Powered by Cloudinary's fast, optimized asset hosting.
- 🔒 **Password Protection** – Encrypt download links with custom passwords to prevent unauthorized access.
- 📨 **Direct Email Sharing** – Instantly email the secure download link to recipients using custom messages via Resend.
- 📊 **Uploader Dashboard** – View all uploaded batches, track total storage used, copy short links, and permanently delete files.
- ⚙️ **Uploader Customization** – Configure default display aliases, default password protection settings, and pre-written email templates in the Settings area.
- 🎨 **Rich Glassmorphic Design** – Visually stunning UI with responsive layouts, modern gradients, and smooth micro-animations.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router & Server Actions/API Endpoints)
- **Database:** Firebase Firestore (NoSQL metadata store for file coordinates & passwords)
- **Object Storage:** Cloudinary API (Secure streaming upload & processing)
- **User Authentication:** Clerk (Authentication, custom redirect routes, and secure sessions)
- **Email Dispatch:** Resend API & custom HTML React-Email template styling
- **Styling:** Tailwind CSS v4 & PostCSS
- **Animations:** React-Lottie Player & Custom Tailwind animations
- **Notifications:** React Toastify
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended) and npm/yarn/pnpm.

### ⚙️ Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/swift-send.git
   cd swift-send/file-sharing-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of the project (copying the values from `.env.example` or creating it from scratch) and populate it with your API credentials:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # Cloudinary Media Services
   CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_Sender_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Resend Email Configuration
   RESEND_API_KEY=your_resend_api_key
   SENDER_EMAIL=your_sender_verified_email@domain.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

---

## 🗂️ Project Structure

```text
file-sharing-app/
├── app/
│   ├── (auth)/                  # Clerk Sign-in / Sign-up routes
│   ├── (dashboard)/             # Authenticated dashboard views
│   │   ├── (routes)/
│   │   │   ├── file-preview/    # File detail & password setup page
│   │   │   ├── files/           # User's uploaded files library manager
│   │   │   ├── settings/        # Default profile & share configuration
│   │   │   └── upload/          # Interactive upload form page
│   │   ├── _components/         # Dashboard layout parts (SideNav, etc.)
│   │   └── layout.js            # Sidebar and Main shell container
│   ├── _components/             # Shared client pages (Hero, Features, etc.)
│   ├── api/
│   │   ├── files/               # Delete files API (Firestore & Cloudinary)
│   │   ├── upload/              # Cloudinary batch upload stream logic
│   │   └── upload/send/         # Email sending controller via Resend
│   ├── f/
│   │   └── [id]/                # Public dynamic route for file recipients
│   ├── globals.css              # Main tailwind imports and variables
│   ├── layout.js                # Top level layout setting up Clerk & Providers
│   └── page.js                  # Landing Page layout
├── CloudinaryConfig.js          # Cloudinary client settings initialization
├── FirebaseConfig.js            # Firebase App and Firestore configuration
├── package.json                 # Project dependencies & scripts
└── tailwind.config.js           # Stylesheet structure mapping
```

---

## 🛡️ Security & Settings

- **Password Hashing/Access Control:** File metadata stored in Firestore dictates if password authorization is required. Dynamic routing blocks the download button and the file preview cards unless a matching password input is provided by the recipient client.
- **Permanent Deletion:** When an owner deletes a file from the dashboard, a Next.js API route deletes the matching document from Firestore and triggers a backend deletion directly to Cloudinary using the file's saved `public_id`, reclaiming storage space instantly.
- **Client Side Storage:** User uploader preferences, including default alias, default password requirements, and custom notes, are cached locally in the browser's `localStorage` for pre-filling subsequent uploads automatically.

---

## 📦 Deployment

### Deploying to Vercel

The easiest way to deploy this application is through the Vercel Platform:

1. Import your cloned project into a new Vercel project.
2. In the project settings, add all variables defined in `.env.local` to the **Environment Variables** tab.
3. Click **Deploy**. Vercel will automatically detect Next.js and build the application bundle.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
