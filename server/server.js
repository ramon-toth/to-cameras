import express from 'express';
import api from './routes/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname } from 'path';
import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// import mongoose from 'mongoose';
// import { interval } from 'rxjs';
// import { updateViewers } from './controllers/viewers.js';

dotenv.config();

const app = express();

const port = process.env.PORT || '8087';
app.set('port', port);

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

// Routes
app.use('/api', api);

// Serve Angular
app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// mongoose.Promise = global.Promise;

// // Connect MongoDB at default port 27017.
// mongoose.connect(
//   process.env.MONGO_URI,
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   },
//   (err) => {
//     if (!err) {
//       console.log('MongoDB Connection Succeeded.');
//     } else {
//       console.log('Error in DB connection: ' + err);
//     }
//   }
// );

// setInterval(() => {
//   console.log('log to mongo');
// }, 5000);
