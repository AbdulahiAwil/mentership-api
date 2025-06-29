import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

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
import { notFound } from './middlewares/notfound.js';
import { errorHandle } from './middlewares/errorHandle.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utility/swagger.js';
import { limiter } from './middlewares/rateLimiter.js'



const app = express()
const PORT = process.env.PORT;




app.use(helmet());
app.use(express.json())
app.use(cors(
  {
    origin:["http://localhost:5173", "http://dugsiiye.com"]
  }
))

app.use(limiter);

console.log(
  process.env.NODE_ENV
)

if(process.env.NODE_ENV == "development") {

   app.use(morgan('dev'))
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(logger);

app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/task', taskRoutes)

app.get('/api/health', (req, res) => {
    res.json("Server is working")

});

// Server frontend in production

if(process.env.NODE_ENV === "production") {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // The Server frontend app

  app.get(/.*/, (req, res)=>{
    res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  })
}

app.use(notFound)

app.use(errorHandle)

mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => console.log( '✅ MongoDB connected locally' ))
  .catch((err) => console.log('❌ Connection error:', err))
  


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
