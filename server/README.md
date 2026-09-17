# DevForge Backend

Node.js + Express + MongoDB backend for the DevForge website. Handles the
**Contact form (project inquiries)** and serves **Services** data, with
SMTP email notifications and a JWT-protected admin API.

## Su banelu che

- `POST /api/inquiries` — Contact form submit karo etle MongoDB ma save thay + admin ne notification email + user ne confirmation email jaay (SMTP)
- `GET /api/inquiries`, `GET /api/inquiries/:id`, `PATCH /api/inquiries/:id`, `DELETE /api/inquiries/:id` — admin only (JWT jaruri)
- `GET /api/services`, `GET /api/services/:slug` — public, MongoDB thi services data (frontend na `Services.tsx` ane `ServiceDetailPage.tsx` aa use kare che)
- `POST /api/services`, `PUT /api/services/:id`, `DELETE /api/services/:id` — admin only
- `POST /api/auth/login` — admin login, JWT token aape che
- Rate limiting (spam-bot thi contact form bachavva mate), Helmet, CORS, input validation — badhu already lagavelu che

## 1. Install

```bash
cd devforge-backend
npm install
```

## 2. .env banavo

```bash
cp .env.example .env
```

Pachi `.env` kholi ne aa values bharo:

| Variable | Su nakhavu |
|---|---|
| `MONGO_URI` | Local: `mongodb://127.0.0.1:27017/devforge` — atlu OK. Cloud mate MongoDB Atlas (free tier) no connection string. |
| `JWT_SECRET` | Koi pan lambi random string (admin login mate) |
| `CLIENT_ORIGIN` | Tamara frontend nu URL, e.g. `http://localhost:5173` |
| `SMTP_HOST/PORT/USER/PASS` | Gmail vapro to niche joyo |
| `ADMIN_EMAIL` | Jya "new inquiry" notification aavse (tamari inbox) |
| `ADMIN_SEED_EMAIL/PASSWORD` | Pehlo admin user banavva mate (ek j vaar seed karvani) |

### Gmail SMTP setup (5 minute)

1. Google Account → Security → 2-Step Verification ON karo
2. https://myaccount.google.com/apppasswords par jaay ne "App Password" banavo
3. E password (16 characters, spaces vagar) `SMTP_PASS` ma nakho, `SMTP_USER` ma tamaru gmail address

## 3. MongoDB chalu karo

Local install hoy to:

```bash
mongod
```

Atlu ma access nathi to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) par free cluster banavo ane e connection string `MONGO_URI` ma nakho.

## 4. Services seed karo

Frontend na existing `serviceData.ts` mathi 6 services already `src/seed/services.json` ma convert kareli che — MongoDB ma nakhva mate:

```bash
npm run seed
```

## 5. Admin user banavo (ek j vaar)

`.env` ma `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` set kari ne:

```bash
npm run seed:admin
```

## 6. Server chalu karo

```bash
npm run dev      # nodemon, auto-restart
# athva
npm start
```

Server `http://localhost:5000` par chalse. Check karva mate: `http://localhost:5000/api/health`

## Admin API vaparvi (Postman / curl)

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@devforge.com","password":"your_password"}'

# Response ma malelo token use kari ne inquiries joi shakay
curl http://localhost:5000/api/inquiries \
  -H "Authorization: Bearer <token>"
```

## Deploy (production)

- Backend: Render / Railway / a VPS par deploy karo, environment variables tya set karo
- `CLIENT_ORIGIN` ma production frontend nu URL nakhvanu bhulso nahi (CORS mate)
- Frontend na `.env` ma `VITE_API_URL` ne production backend URL par point karvanu

## Folder structure

```
src/
  app.js              — express app + middleware wiring
  server.js            — entry point (DB connect + listen)
  config/               — mongodb + nodemailer config
  models/               — Inquiry, Service, Admin (mongoose schemas)
  controllers/           — route handlers
  routes/                 — express routers
  middleware/              — auth (JWT), rate limiting, error handling
  utils/                    — email templates, project-id generator
  seed/                      — seedServices.js, seedAdmin.js, services.json
```
