# Railway Deployment Guide

## Quick Setup

### 1. Environment Variables (Set in Railway Dashboard)
```
DB_HOST=<railway-mysql-host>
DB_USER=<railway-mysql-user>
DB_PASSWORD=<railway-mysql-password>
DB_NAME=<railway-mysql-database>
DB_PORT=<railway-mysql-port>
NODE_ENV=production
```

### 2. Deploy
1. Connect GitHub repo to Railway
2. Railway auto-builds and deploys
3. Run migration: `npm run migrate`

## Architecture
- Single unit deployment
- Angular served as static files by Node.js
- All routes handled by one server
- Database unchanged (just update connection)