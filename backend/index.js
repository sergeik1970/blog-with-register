import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import cookieParser from 'cookie-parser';
import UserModel from './models/UserModel.js';
import PostModel from './models/PostModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
// const allowedOrigins = [
//     process.env.FRONTEND_URL,           // продакшн фронт
//     'http://localhost:5173'             // локальный фронт (Vite)
//   ];

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI);

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token is missing")
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("Token is invalid")
            }
            else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        })

    }
}

app.get("/", verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username })
})


const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
})

app.post("/create", verifyUser, upload.single("file"), async (req, res) => {
    try {
        const imageBase64 = req.file
            ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
            : "";

        await PostModel.create({
            title: req.body.title,
            description: req.body.description,
            file: imageBase64,
            email: req.body.email,
            username: req.body.username
        });

        res.json("Success");
    } catch (err) {
        res.status(500).json(err);
    }
});

// app.post("/create", verifyUser, upload.single("file"), async (req, res) => {
//     try {
//       await PostModel.create({
//         title: req.body.title,
//         description: req.body.description,
//         file: req.file.filename, // только имя файла
//         email: req.body.email,
//         username: req.body.username
//       });

//       res.json("Success");
//     } catch (err) {
//       console.error("Ошибка при создании поста:", err);
//       res.status(500).json(err);
//     }
//   });

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            // потом изменить approved на false
            UserModel.create({ username, email, password: hash, approved: true })
                .then(user => res.json(user))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json("User not exist")
            }
            else if (user && user.approved) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, username: user.username },
                            "jwt-secret-key",
                            { expiresIn: "1d" })
                        res.cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "None"
                        });
                        return res.json("Success")
                    }
                    else {
                        return res.json("Incorrect Password")
                    }
                })
            }
            else {
                return res.json("User is not approved")
            }
        })
})

// app.get("/logout", (req, res) => {
//     res.clearCookie("token")
//     return res.json("Success")
// })

app.get("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    return res.json("Success");
});

app.get('/getposts', async (req, res) => {
    try {
        const limit = 2;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const posts = await PostModel.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ], { allowDiskUse: true });

        res.json(posts);
    } catch (err) {
        console.error("Ошибка в /getposts:", err);
        res.status(500).json({ error: "Ошибка сервера при получении постов" });
    }
});


// app.get('/getposts', async (req, res) => {
//     try {
//       const posts = await PostModel.aggregate([
//         { $sort: { createdAt: -1 } }
//       ], { allowDiskUse: true }); // 👈 вот тут разрешаем использовать диск

//       res.json(posts);
//     } catch (err) {
//       console.error("Ошибка при получении постов:", err);
//       res.status(500).json({ error: "Ошибка сервера при получении постов" });
//     }
//   });

// app.get('/getposts', (req, res) => {
//     PostModel.find().sort({createdAt: -1}).limit(100)
//         .then(posts => res.json(posts))
//         .catch(err => res.json(err))
// })

app.get('/getpostbyid/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

app.delete('/deletepostbyid/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndDelete({ _id: id })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

app.put('/editpostbyid/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate({ _id: id }, { title: req.body.title, description: req.body.description })
        .then(post => res.json("Success"))
        .catch(err => res.json(err))

})

app.listen(3001, function () {
    console.log('listening on port 3001');
})