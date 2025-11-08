import Product from '../models/product.model.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product (for testing)
export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Seed initial products
export const seedProducts = async (req, res) => {
  const initialProducts = [
    {
      name: "Smartphone X",
      price: 699.99,
      description: "Latest smartphone with amazing features",
      image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg"
    },
    {
      name: "Laptop Pro",
      price: 1299.99,
      description: "High-performance laptop for professionals",
      image: "https://media.istockphoto.com/id/1478610652/photo/hcmc-vietnam-macbook-pro-14-inches-m2.jpg?s=612x612&w=0&k=20&c=r7n3ZWk5KbIEW6MmpAGWaXsUIKvL-KgskI6fS-t5jv4="
    },
    {
      name: "Wireless Headphones",
      price: 199.99,
      description: "Premium wireless headphones with noise cancellation",
      image: "https://media.istockphoto.com/id/1372906882/photo/modern-blue-wireless-headphones-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=0k-2JFElEQ0QTvXsgtLx3i2JotQo_Eb8aEwyN-BOZjA="
    },
    {
      name: "Smart Watch",
      price: 299.99,
      description: "Feature-rich smartwatch with health tracking",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
    },
    {
      name: "Tablet Ultra",
      price: 499.99,
      description: "Slim and powerful tablet for entertainment",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/galaxy-tab-s8-ultra-lead.jpg?c=16x9&q=h_833,w_1480,c_fill"
    }
  ];

  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(initialProducts);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};