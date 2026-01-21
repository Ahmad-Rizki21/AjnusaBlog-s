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

### Local Development
- **Node.js** 20+
- **npm** atau package manager lain
- **MySQL** database
- **Git**

### Docker Development
- **Docker Desktop** (Mac/Windows) atau Docker Engine (Linux)
- **Docker Compose**

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

## Docker Deployment

### Using Docker Compose (Recommended)

Cara termudah untuk menjalankan aplikasi dengan database MySQL:

```bash
# Clone repository
git clone https://github.com/Ahmad-Rizki21/AjnusaBlog-s.git
cd AjnusaBlog-s

# Buat file .env untuk NEXTAUTH_SECRET
echo "NEXTAUTH_SECRET=your-secure-random-secret-key" > .env

# Jalankan dengan Docker Compose
docker-compose up -d

# Cek logs
docker-compose logs -f app
```

Aplikasi akan berjalan di http://localhost:3000

### Build Docker Image Manual

```bash
# Build image
docker build -t ajnusa-blog .

# Run container (pastikan MySQL sudah running)
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:password@host:3306/ajnusa_db" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  ajnusa-blog
```

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start semua services di background |
| `docker-compose down` | Stop semua services |
| `docker-compose logs -f` | Lihat logs real-time |
| `docker-compose exec app sh` | Masuk ke container shell |
| `docker-compose restart` | Restart services |

## CI/CD with GitHub Actions

Project ini sudah dilengkapi dengan GitHub Actions workflow untuk automated build dan security scanning.

### Workflow Features

- **Lint & Type Check** - Validasi code quality
- **Docker Build & Push** - Automated build ke GitHub Container Registry
- **Security Scan** - Trivy vulnerability scanner
- **Deploy Notification** - Notifikasi deploy ke production

### Container Registry

Docker image dipublish ke:
```
ghcr.io/ahmad-rizki21/ajnusa-blog:latest
```

### Pull Docker Image

```bash
# Pull image dari registry
docker pull ghcr.io/ahmad-rizki21/ajnusa-blog:latest

# Run image
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://..." \
  -e NEXTAUTH_URL="http://your-domain.com" \
  -e NEXTAUTH_SECRET="your-secret" \
  ghcr.io/ahmad-rizki21/ajnusa-blog:latest
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
