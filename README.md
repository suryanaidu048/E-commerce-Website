<<<<<<< HEAD
# EcoBazar - Eco-Friendly E-Commerce Platform (Firebase Edition)

A full-stack e-commerce application focused on selling eco-friendly products, built with Next.js 14, Firebase, and modern web technologies.

## 🌱 Features

### Frontend
- **Modern UI**: Built with Next.js 14 and Tailwind CSS
- **Responsive Design**: Mobile-first approach with eco-friendly green theme
- **Product Catalog**: Browse products with filtering and search functionality
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **User Authentication**: Secure login/register system with Firebase Auth
- **Admin Dashboard**: Product management for admin users

### Backend
- **Firebase Integration**: Firestore for database, Firebase Auth for authentication
- **REST API**: Next.js API routes for product management
- **Real-time Updates**: Firebase real-time capabilities
- **Image Handling**: Uses public URLs only (Unsplash, Pexels)

### Key Pages
- `/` - Home page with featured products and categories
- `/shop` - Product catalog with filters and search
- `/product/[id]` - Individual product details
- `/cart` - Shopping cart management
- `/login` & `/register` - Authentication pages
- `/admin` - Admin dashboard (admin users only)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ecobazar-firebase
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Get your Firebase config from Project Settings

4. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your Firebase config:
   \`\`\`env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

6. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

After seeding the database, you can use these credentials:

**Admin Account:**
- Email: `admin@ecobazar.com`
- Password: `admin123`

**User Account:**
- Email: `user@ecobazar.com`
- Password: `user123`

## 📁 Project Structure

\`\`\`
ecobazar-firebase/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── login/             # Authentication
│   ├── product/           # Product details
│   └── shop/              # Product catalog
├── components/            # Reusable React components
├── contexts/              # React Context providers
├── lib/                   # Firebase config and utilities
├── scripts/               # Database seeding
└── public/                # Static assets
\`\`\`

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Firebase (Firestore + Auth)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom green theme

## 📦 Firebase Collections

### Products Collection
\`\`\`javascript
{
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String,
  featured: Boolean,
  createdAt: String (ISO date)
}
\`\`\`

### Users Collection
\`\`\`javascript
{
  email: String,
  role: String, // 'user' or 'admin'
  createdAt: String (ISO date)
}
\`\`\`

## 🌍 Categories

- Personal Care
- Household Essentials  
- Reusable Alternatives
- Gardening & Green Living
- Fashion & Accessories
- Gift Items

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

## 🎨 Design Features

- **Eco-friendly color scheme**: Green-focused palette
- **Responsive design**: Works on all device sizes
- **Modern UI components**: Cards, modals, forms
- **Loading states**: Skeleton loaders and spinners
- **Interactive elements**: Hover effects and transitions

## 🔒 Security Features

- Firebase Authentication with email/password
- Role-based access control (admin/user)
- Protected routes for admin access
- Firestore security rules (recommended to configure)

## 📱 Mobile Responsive

The application is fully responsive with:
- Mobile-first design approach
- Collapsible navigation menu
- Touch-friendly interface
- Optimized layouts for all screen sizes

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting (Alternative)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🔧 Firebase Configuration

### Firestore Security Rules (Recommended)

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read for all, write for admin only
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users - read/write own document only
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

### Authentication Settings

1. Go to Firebase Console > Authentication > Sign-in method
2. Enable Email/Password provider
3. Configure authorized domains for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- Images from Unsplash and Pexels
- Icons from Lucide React
- Firebase for backend services
- UI inspiration from modern e-commerce platforms

---

**EcoBazar** - Building a sustainable future, one purchase at a time! 🌱
=======
# E-commerce-Website
>>>>>>> 5d4053648b39768a4b2c619b29180c4c00d6a11c
