🌍 Wanderlust – Full Stack Web Application

Wonderlust is a full-stack web application inspired by platforms like Airbnb, designed to manage travel listings. Users can explore destinations, view detailed listings, and perform full CRUD operations.
This project focuses on real-world backend development, cloud database integration, and production deployment.

🚀 Live Demo:
👉 https://wonderlust-app-4uac.onrender.com/

📂 GitHub Repository:
👉 https://github.com/mohdtajul/Wanderlust.git

🛠️ Tech Stack

Frontend
- EJS (Embedded JavaScript Templates)

- CSS / Bootstrap

Backend

- Node.js

- Express.js

- Database

- MongoDB Atlas (Cloud Database)

Deployment

- Render (Backend Hosting)

Other Tools & Libraries

- Mongoose (ODM)

- Joi (Server-side validation)

- dotenv (Environment variables)

✨ Features

- 📌 View all travel listings

- ➕ Create new listings

- ✏️ Edit existing listings

- 🗑️ Delete listings

- 📝 Add and manage reviews

- ⚠️ Centralized error handling

- ✅ Server-side validation

- 🌐 MongoDB Atlas cloud database

- 🚀 Deployed to production using Render

🔒 Authentication & Authorization are planned for future versions.

## 📸 Screenshots

### Home Page
![Home Page](screenshots/Home_Page.png)

### Listing Details
![Listing Details](screenshots/Listing_Details.png)

### Add New Listing
![Add Listing](screenshots/New_Listing.png)

### Edit Listing
![Edit Listing](screenshots/Edit_Listing.png)


## 📂 Project Structure
```bash
Wanderlust/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   └── reviews.js
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── edit.ejs
│   │   └── newplace.ejs
│   └── error.ejs
│
├── app.js
├── package.json
├── .env
└── README.md
```

⚙️ Environment Variables

To run this project, create a .env file and add:

DB_URL=your_mongodb_atlas_connection_string


These environment variables are securely configured on Render for production.

🧪 Run Locally

1️⃣ Clone the repository

git clone https://github.com/mohdtajul/Wanderlust.git


2️⃣ Go to project directory

3️⃣ Install dependencies

npm install


4️⃣ Add environment variables

DB_URL=your_mongodb_url

5️⃣ Start the server

npm start


6️⃣ Open in browser

http://localhost:PORT

🚀 Deployment

- Backend deployed on Render

- Database hosted on MongoDB Atlas

- Secure environment variables configured on Render

- Automatic deployment from GitHub repository

🧠 Learning Outcomes

- Built a full-stack CRUD application using Express and MongoDB

- Migrated database from local MongoDB Compass to MongoDB Atlas

- Implemented MVC architecture

- Handled errors using custom middleware

- Used environment variables for secure configuration

- Deployed a Node.js application to Render

- Understood free-tier hosting limitations (cold starts)

🚧 Future Enhancements

- User Authentication & Authorization

- Image uploads with Cloudinary

- Flash messages and UI improvements

- Search and filter listings

- Role-based access control

👤 Author

Mohd Tajul

- GitHub: https://github.com/mohdtajul

- Project Repo: https://github.com/mohdtajul/Wanderlust.git

⭐ If you find this project helpful, consider giving it a star!