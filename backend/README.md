```markdown
# Web Project Around Express

## 📌 Description
This project is part of the learning journey in backend development using **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It focuses on building a RESTful API with user and card management, including features like updating user data, adding likes/dislikes, and handling errors properly.  

---

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the server:

   ```bash
   npm run start
   ```

   Or run in dev mode:

   ```bash
   npm run dev
   ```

---

## 🚀 Features
- **User management**
  - Create users
  - Update user info (`name`, `about`, `avatar`)
  - Get user by ID

- **Card management**
  - Create and delete cards
  - Get card by ID
  - Like and dislike cards (using MongoDB `$addToSet` and `$pull`)

- **Error handling**
  - Centralized error handling with custom status codes
  - Validation errors return `400`
  - Cast errors return `400` (invalid ID format)
  - Not found errors return `404`
  - Server errors return `500`

- **ESLint integration**
  - Code linting with `.eslintrc`
  - `.eslintcache` ignored in `.gitignore`

---

## 📂 Project Structure
```

project-root/
│── controllers/
│   ├── users.js
│   └── cards.js
│── models/
│   ├── user.js
│   └── card.js
│── routes/
│   ├── users.js
│   └── cards.js
│── app.js
│── .eslintrc
│── .editorconfig
│── .gitignore
│── package.json

````

---

## 🌐 API Endpoints

### Users

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/users/:id`        | Get user by ID     |
| PATCH  | `/users/:id`        | Update user info   |
| PATCH  | `/users/:id/avatar` | Update user avatar |

### Cards

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | `/cards/:id`           | Get card by ID    |
| POST   | `/cards`               | Create new card   |
| DELETE | `/cards/:id`           | Delete card by ID |
| PUT    | `/cards/:cardId/likes` | Like a card       |
| DELETE | `/cards/:cardId/likes` | Dislike a card    |

---

## 🛠 Technologies Used

* Node.js
* Express
* MongoDB & Mongoose
* ESLint

---

## 📌 Notes

* Currently, authentication is **not yet implemented**.
* For testing the like/dislike feature, a **mock user ID** can be used until authentication is added.
* Environment variables (such as DB connection string) should be placed in a `.env` file and are ignored via `.gitignore`.

---

## ✨ Future Improvements

* Add JWT-based authentication
* Add request validation with Celebrate/Joi
* Improve error handling middleware
* Add tests with Jest
