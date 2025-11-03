# 🛍️ EllaMarket

EllaMarket is a modern, full-stack e-commerce application built with cutting-edge technologies. It offers a seamless shopping experience with robust user authentication, dynamic product browsing, and interactive features like cart and wishlist management. Designed for scalability and performance, EllaMarket is ideal for developers seeking a professional-grade portfolio project or a foundation for a production-ready store.

## 🚀 Features

### ✅ Completed Functionality

- **User Authentication**: Secure login and registration powered by Supabase.
- **Add to Cart**: Real-time cart updates with persistent state.
- **Add to Wishlist**: Save favorite items for later.
- **Product Filtering**: Filter by category, price, and other attributes.
- **Search**: Fast, fuzzy search across product catalog.
- **Product Detail View**: Rich product pages with images, descriptions, and metadata.

### 🔧 Upcoming Enhancements

- **Checkout Flow**: Payment integration and order confirmation.
- **Customer Reviews**: User-generated reviews and ratings.
- **Light/Dark Mode**: Theme toggle for personalized UI experience.

## 🧰 Tech Stack

| Layer    | Technology                                                  |
| -------- | ----------------------------------------------------------- |
| Frontend | [Next.js](https://nextjs.org/) (latest, using page routing) |
| Styling  | [Tailwind CSS](https://tailwindcss.com/)                    |
| Backend  | [Supabase](https://supabase.com/) (Auth, Database, API)     |

## 📁 Project Structure

```
ella-market/
├── pages/               # Next.js page routes
├── components/          # Reusable UI components
├── styles/              # Tailwind configuration and global styles
├── lib/                 # Supabase client and utility functions
├── public/              # Static assets
└── README.md
```

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ella-market.git
cd ella-market
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a `.env.local` file and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

## 🧪 Testing

Basic unit and integration tests can be added using your preferred framework (e.g., Jest, React Testing Library).

## 📦 Deployment

EllaMarket can be deployed on platforms like:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Supabase Hosting](https://supabase.com/docs/guides/hosting)

## 📌 Roadmap

- [ ] Integrate Stripe or PayPal for checkout
- [ ] Add customer review system
- [ ] Implement light/dark mode toggle
- [ ] Optimize SEO and performance
- [ ] Add admin dashboard for product management

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](LICENSE)
