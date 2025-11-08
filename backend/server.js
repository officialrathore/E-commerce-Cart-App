import express,{json} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routers/product.routes.js';
import cartRoutes from './routers/cart.routes.js';

const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URL=process.env.MONGO_URL || 'mongodb://localhost:27017/Ecommerce-Cart';
app.use(cors());
app.use(json());

mongoose.connect(MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('Backend is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
