
# 🏆 Leaderboard System

A scalable and performant user leaderboard system for a fast-growing gaming company. This project is built with **NestJS**, **PostgreSQL**, **TypeORM**, and optional **Redis caching**, and is designed to handle over **10 million users**.

---

## 🛠️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **npm**
- **PostgreSQL** (>= 13.x)

### 1️⃣ Clone the Repository
```bash
git clone <repository_url>
cd <project_directory>
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3000
```

### 4️⃣ Start the Application
For development:
```bash
npm run start:dev
```
For production:
```bash
npm run build
npm run start:prod
```

### 5️⃣ Code Formatting and Linting
To maintain code quality and consistency, the project uses **ESLint** and **Prettier**.

#### Run ESLint
```bash
npm run lint
```

#### Fix ESLint Issues Automatically
```bash
npm run lint:fix
```

#### Run Prettier
```bash
npm run format
```

---

## Data Structure Design
the data structure design i chose is to have single table for both the score and the users.
the rank of the player will be calculated on demand based on all the player score.

the reasons for this structure are
- on all the read queries the user and the score are always needed together
- the rank is calculated on demand because the rank can change on any user score update and if it will be saved the calculation can be heavy and cause problems wit the synchronization of the data
- the user and its score are standing alone so the maintaining of the data on  a big scale is easy

User {\
   &emsp; id: number;\
   &emsp; totalScore: number;\
   &emsp; name: string;\
   &emsp; image: string;\
}

---

## 🗃️ Database Schema

### Table: `user`
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  image TEXT,
  "totalScore" BIGINT DEFAULT 0,
);
```

### View: `ranked_users`
```sql
CREATE OR REPLACE VIEW ranked_users AS
SELECT
  id,
  name,
  image,
  "totalScore",
  ROW_NUMBER() OVER (ORDER BY "totalScore" DESC, id ASC) AS rank
FROM public.user;
```

### Indexes
```sql
CREATE INDEX idx_users_total_score_desc ON public.user ("totalScore" DESC);
CREATE INDEX idx_users_score_id_desc ON public.user ("totalScore" DESC, id ASC);
CREATE UNIQUE INDEX idx_users_id ON public.user (id);
```


### why this schema
- the view make it easy to query the users by rank or query the rank of a user
- view support millions of rows and can help organize the ranks dynamically without overlapping
- the indexes help improve performances of the view and queries by significant time
---

## 🔌 API Endpoints

| Method | URL                            | Description                            |
|--------|--------------------------------|----------------------------------------|
| POST   | `/users`                       | Add new user                           |
| POST   | `/users/:id/score`             | Update user’s score                    |
| GET    | `/users/leaderboard?limit=10`  | Get top N users (cached)               |
| GET    | `/users/:id/around`            | Get user rank + 5 above/below (cached) |



## ☁️ AWS Architecture (Design-Only)

- **EC2** or **ECS Fargate** for NestJS service
- **RDS PostgreSQL** (with read replica)
- **ElastiCache Redis** for leaderboard caching
- **ALB** + **API Gateway** for routing
- **CloudWatch Logs** + **X-Ray** for observability
- **Auto Scaling Group** for API service
