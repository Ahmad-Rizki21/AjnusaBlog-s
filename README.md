# Ajnusa Website - Blog Platform

Website lengkap dengan blog system untuk AJNUSA. Dibangun dengan teknologi modern dan scalable.

## Tech Stack

### Frontend
- **Next.js 16.1.4** - React framework dengan App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.27.5** - Animation library
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management

### Backend
- **Next.js API Routes** - Serverless API
- **NextAuth.js 4.24.13** - Authentication library
- **Prisma 5.22.0** - ORM untuk database

### Database
- **MySQL** - Database utama
- **Prisma ORM** - Database management

### Authentication & Security
- **bcryptjs** - Password hashing
- **NextAuth.js** - Session management

## Database Schema

### BlogPost
- `id` (UUID) - Primary key
- `title` - Judul post
- `slug` - URL friendly identifier
- `excerpt` - Ringkasan post
- `content` - Konten lengkap
- `image` - URL gambar (opsional)
- `category` - Kategori post
- `author` - Penulis post
- `published` - Status publish
- `createdAt` - Tanggal dibuat
- `updatedAt` - Tanggal diupdate

### Admin
- `id` (UUID) - Primary key
- `username` - Username login
- `password` - Hashed password
- `name` - Nama lengkap
- `email` - Email address
- `createdAt` - Tanggal dibuat
- `updatedAt` - Tanggal diupdate

## Prerequisites

- **Node.js** 20+
- **npm** atau package manager lain
- **MySQL** database
- **Git**

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Ahmad-Rizki21/AjnusaBlog-s.git
cd AjnusaBlog-s
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/ajnusa_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── (site)/        # Public pages
│   ├── admin/         # Admin dashboard
│   ├── blog/          # Blog pages
│   └── api/           # API routes
├── components/        # React components
├── lib/              # Utility functions
├── types/            # TypeScript types
└── data/             # Static data

prisma/
└── schema.prisma     # Database schema
```

## Branches

- `main` - Production ready code
- `dev` - Development branch
- `master` - Initial branch (legacy)

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Author

**Ahmad Rizki** - [GitHub](https://github.com/Ahmad-Rizki21)

## License

This project is licensed under the MIT License.
