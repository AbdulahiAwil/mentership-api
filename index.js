import express from 'express'
import userRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import taskRoutes from './routes/task.js'
import dotenv from 'dotenv'
import helmet from 'helmet';

dotenv.config();
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose';
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notfound.js';
import { errorHandle } from './middlewares/errorHandle.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utility/swagger.js';
import { limiter } from './middlewares/rateLimiter.js'



const app = express()
const PORT = process.env.PORT;

const users = [
  {name: "ali", age:27},
  {name: "ayaan", age:25}
]


app.use(helmet());
app.use(express.json())
app.use(cors(
  {
    origin:["http://localhost:5879", "http://dugsiiye.com"]
  }
))

app.use(limiter);

console.log(
  process.env.NODE_ENV
)

if(process.env.NODE_ENV == "development") {

   app.use(morgan('dev'))
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(logger);

app.use('/users', userRoutes)
app.use('/posts', postsRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/upload', uploadRoutes)
app.use('/task', taskRoutes)

app.get('/', (req, res) => {
    res.json(users)

});

app.use(notFound)

app.use(errorHandle)

mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => console.log( '✅ MongoDB connected locally' ))
  .catch((err) => console.log('❌ Connection error:', err))
  


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
