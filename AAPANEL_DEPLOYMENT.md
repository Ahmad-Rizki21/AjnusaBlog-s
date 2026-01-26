# Panduan Deployment ke aaPanel (Tanpa Docker)

## Informasi Server
- **IP Address**: 192.168.222.55
- **Port**: 3001
- **GitHub**: https://github.com/Ahmad-Rizki21/AjnusaBlog-s
- **Framework**: Next.js 16 + MySQL + Prisma

---

## Langkah 1: Persiapan di aaPanel

### 1.1 Install Required Software

Login ke aaPanel dan install via App Store:

1. **Node.js** (versi 20.x LTS)
   - App Store → Search "Node.js" → Install

2. **MySQL** (versi 8.0)
   - App Store → Search "MySQL" → Install
   - Set root password (catat password ini!)

3. **PM2** (Process Manager)
   - Install via SSH setelah Node.js terinstall

4. **Nginx** (Optional - untuk reverse proxy)
   - App Store → Search "Nginx" → Install

### 1.2 Buka Port 3001
1. Masuk ke menu **Security** → **Firewall**
2. Tambahkan rule:
   - Port: `3001`
   - Protocol: `TCP`
   - Strategy: `Accept`
   - Description: `Ajnusa Website`

---

## Langkah 2: Setup Database

### 2.1 Buat Database via aaPanel
1. Masuk ke menu **Databases**
2. Klik **Create Database**
3. Isi:
   - Database Name: `ajnusa_db`
   - Username: `root` (atau buat user baru)
   - Password: (sesuai setting MySQL)
   - Charset: `utf8mb4`

### 2.2 Atau via MySQL phpMyAdmin
1. Buka phpMyAdmin dari aaPanel
2. Buat database baru: `ajnusa_db`

---

## Langkah 3: Clone & Setup Project

### 3.1 SSH ke Server aaPanel
```bash
ssh root@192.168.222.55
# atau gunakan SSH terminal dari aaPanel
```

### 3.2 Clone Repository
```bash
# Navigate ke web root
cd /www/wwwroot

# Clone repository
git clone https://github.com/Ahmad-Rizki21/AjnusaBlog-s.git ajnusa-website

# Masuk ke folder project
cd ajnusa-website
```

### 3.3 Install PM2
```bash
npm install -g pm2
```

### 3.4 Setup Environment Variables
```bash
# Copy file env production
cp .env.production .env

# Edit file .env
nano .env
```

Update `.env` dengan konfigurasi yang sesuai:
```env
# Database URL (sesuaikan dengan password MySQL Anda)
DATABASE_URL="mysql://root:PASSWORD_MYSQL_ANDA@localhost:3306/ajnusa_db"

# Generate secret key baru dengan: openssl rand -base64 32
NEXTAUTH_SECRET="RANDOM_STRING_32_CHAR_DISINI"

# URL aplikasi
NEXTAUTH_URL="http://192.168.222.55:3001"

# Port
PORT=3001

FIX_SLUGS=false
```

**PENTING**: Generate NEXTAUTH_SECRET dengan:
```bash
openssl rand -base64 32
```

---

## Langkah 4: Build & Install Dependencies

### 4.1 Install Dependencies
```bash
cd /www/wwwroot/ajnusa-website
npm install
```

### 4.2 Generate Prisma Client
```bash
npx prisma generate
```

### 4.3 Run Database Migrations
```bash
npx prisma migrate deploy
```

### 4.4 Seed Database (Data Awal)
```bash
npx prisma db seed
```

### 4.5 Build Next.js Application
```bash
npm run build
```

---

## Langkah 5: Jalankan dengan PM2

### 5.1 Setup PM2
```bash
# Buat folder untuk logs
mkdir -p /www/wwwroot/ajnusa-website/logs

# Start aplikasi dengan PM2
pm2 start ecosystem.config.js

# Cek status
pm2 status

# Lihat logs
pm2 logs ajnusa-website
```

### 5.2 Setup PM2 Auto-start on Reboot
```bash
# Save PM2 process list
pm2 save

# Setup startup script
pm2 startup
```

Follow instruksi yang muncul dan jalankan command yang diberikan.

---

## Langkah 6: Verifikasi Deployment

### 6.1 Cek PM2 Status
```bash
pm2 status
```

Harus menunjukkan status `online` untuk `ajnusa-website`.

### 6.2 Cek Logs
```bash
pm2 logs ajnusa-website --lines 50
```

### 6.3 Akses Website
Buka browser dan akses:
- **Website**: http://192.168.222.55:3001
- **Admin Panel**: http://192.168.222.55:3001/admin

### 6.4 Login Admin
Default admin user (dari seed):
- Username: `admin`
- Password: `admin123`

**PENTING**: Ganti password default segera setelah login!

---

## Langkah 7: Setup Nginx Reverse Proxy (Optional tapi Recommended)

Ini memungkinkan website diakses via port 80/443 tanpa perlu mengetik :3001

### 7.1 Tambah Website di aaPanel
1. Masuk ke menu **Website**
2. Klik **Add Site**
3. Pilih:
   - Domain: `192.168.222.55` atau domain Anda
   - Root: `/www/wwwroot/ajnusa-website`
   - PHP: `Pure Static` (tidak pakai PHP)

### 7.2 Setup Reverse Proxy
1. Buka website yang baru dibuat
2. Klik **Settings** → **Reverse Proxy**
3. Add reverse proxy:
   - Proxy Name: `Ajnusa Next.js`
   - Target URL: `http://127.0.0.1:3001`
   - Send Domain: `$host`

### 7.3 Atau Edit Nginx Config Manual
Edit config nginx di aaPanel:
```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

Reload Nginx:
```bash
nginx -t
nginx -s reload
```

---

## Commands Penting

### PM2 Commands
```bash
# Cek status
pm2 status

# Lihat logs
pm2 logs ajnusa-website

# Restart aplikasi
pm2 restart ajnusa-website

# Stop aplikasi
pm2 stop ajnusa-website

# Delete dari PM2
pm2 delete ajnusa-website

# Monitor (real-time)
pm2 monit
```

### Update dari GitHub
```bash
cd /www/wwwroot/ajnusa-website
git pull origin main
npm install
npm run build
pm2 restart ajnusa-website
```

### Database Commands
```bash
# Run migration baru
npx prisma migrate deploy

# Reset dan re-seed database (HATI-HATI: menghapus data!)
npx prisma migrate reset

# Generate ulang Prisma Client
npx prisma generate

# Backup database
mysqldump -u root -p ajnusa_db > backup_$(date +%Y%m%d).sql

# Restore database
mysql -u root -p ajnusa_db < backup_20240126.sql
```

---

## Troubleshooting

### Port 3001 tidak bisa diakses
1. Cek apakah PM2 sudah running:
```bash
pm2 status
```

2. Cek apakah port 3001 sudah listen:
```bash
netstat -tuln | grep 3001
```

3. Cek firewall aaPanel:
   - Security → Firewall → Pastikan port 3001 open

### Database connection error
1. Cek apakah MySQL sudah running:
```bash
systemctl status mysql
# atau
service mysql status
```

2. Test connection ke database:
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

3. Cek apakah database `ajnusa_db` sudah ada:
```bash
mysql -u root -p -e "USE ajnusa_db; SHOW TABLES;"
```

### Build error
```bash
# Clear cache dan rebuild
rm -rf .next
npm run build
```

### PM2 tidak auto-start setelah reboot
```bash
pm2 save
pm2 startup
```

### Migration tidak jalan
```bash
# Check prisma status
npx prisma migrate status

# Force run migration
npx prisma migrate deploy
```

---

## Security Checklist

Sebelum website production, pastikan:

- [ ] Ganti `NEXTAUTH_SECRET` dengan string random yang aman
- [ ] Ganti password default admin user (`admin`/`admin123`)
- [ ] Ganti password default MySQL root user
- [ ] Setup SSL certificate (aaPanel Let's Encrypt)
- [ ] Enable firewall
- [ ] Setup regular database backups
- [ ] Limit MySQL access ke localhost saja
- [ ] Disable directory listing di Nginx

---

## Setup SSL dengan Let's Encrypt (aaPanel)

### Install SSL Certificate
1. Masuk ke menu **Website**
2. Pilih website Anda
3. Klik **Settings** → **SSL**
4. Pilih **Let's Encrypt**
5. Pilih domain dan klik **Apply**

### Force HTTPS
Di Nginx config atau aaPanel website settings:
1. Enable **Force HTTPS**
2. Atau tambahkan di nginx config:
```nginx
if ($scheme != "https") {
    return 301 https://$host$request_uri;
}
```

---

## Monitoring & Maintenance

### Cek Resource Usage
```bash
pm2 monit
```

### Setup Auto-restart jika crash
PM2 akan otomatis restart jika app crash. Untuk konfigurasi lebih lanjut, edit `ecosystem.config.js`.

### Backup Schedule (Cronjob)
Tambah di aaPanel **Cron**:
```bash
# Backup database setiap hari jam 2 pagi
0 2 * * * mysqldump -u root -pPASSWORD ajnusa_db > /www/backup/ajnusa_$(date +\%Y\%m\%d).sql

# Backup setiap minggu
0 2 * * 0 mysqldump -u root -pPASSWORD ajnusa_db > /www/backup/ajnusa_weekly_$(date +\%Y\%m\%d).sql
```

---

## File-file yang Dibuat untuk Deployment

File-file berikut telah ditambahkan untuk memudahkan deployment:

1. **ecosystem.config.js** - Konfigurasi PM2
2. **.env.production** - Template environment variables untuk production
3. **docker-compose.aapanel.yml** - Jika ingin menggunakan Docker di kemudian hari

---

## Contact & Support

Untuk bantuan lebih lanjut:
- GitHub: https://github.com/Ahmad-Rizki21/AjnusaBlog-s
- Issues: https://github.com/Ahmad-Rizki21/AjnusaBlog-s/issues

---

## Quick Reference Summary

```bash
# 1. Clone & Install
cd /www/wwwroot
git clone https://github.com/Ahmad-Rizki21/AjnusaBlog-s.git ajnusa-website
cd ajnusa-website
npm install

# 2. Setup Env
cp .env.production .env
nano .env  # edit DATABASE_URL dan NEXTAUTH_SECRET

# 3. Setup Database
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# 4. Build
npm run build

# 5. Start PM2
mkdir -p logs
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 6. Verify
pm2 logs
# Akses: http://192.168.222.55:3001
```
