import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db';
import { products } from './db/schema';
import { eq } from 'drizzle-orm';

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
app.use(cors());  // 安全相关中间件放在最前面
app.use(express.json());  // 然后是请求体解析
app.use(express.urlencoded({ extended: true }));

// 基本路由
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Cafe Shop API' });
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.json('Welcome to Cafe Shop API');
});

app.get('/api/v1/products', (req: Request, res: Response) => {
  res.json({
    products: 'ice long black',
    price: 10,
    size: 'large',
    message: 'welcome to cafe shop api',
  });
});

// 获取所有产品
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/ids', async (req: Request, res: Response) => {
  try {
    const allProductsId = await db.select({ id: products.id }).from(products);
    res.json(allProductsId);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products ids' });
  }
});

app.get('/api/products/ids/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;  // 从 URL 获取参数
    const product = await db.select().from(products).where(eq(products.id, productId));
    res.json(product);
    console.log(productId);
    console.log(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/api/products/name', async (req: Request, res: Response) => {
  try {
    const allProductsName = await db.select({
      id: products.id,
      product_name: products.product_name,
      image_url: products.image_url
    }).from(products);
    res.json(allProductsName);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products name' });
  }
});

app.get('/api/products/name/:id', async (req: Request, res: Response) => {
  try {
    const coffeeId = req.params.id;
    const coffeeDetails = await db
      .select({
        product_name: products.product_name,
        image_url: products.image_url,
        price: products.original_price,
        size: products.size,
        description: products.description,
        origin: products.origin,
        roasting_level: products.roasting,
        material: products.material,
        specifications: products.specifications,
        brand: products.brand,
      })
      .from(products)
      .where(eq(products.id, parseInt(coffeeId)))
      .limit(1);
    // 检查是否找到咖啡
    if (!coffeeDetails || coffeeDetails.length === 0) {
      return res.status(404).json({ error: 'Coffee not found' });
    }
    // 返回找到的第一个（也是唯一的）结果
    res.json(coffeeDetails[0]);
  } catch (error) {
    console.error('Error fetching coffee details:', error);
    res.status(500).json({ error: 'Failed to fetch coffee details' });
  }
});

app.get('/api/products/is_hot', async (req: Request, res: Response) => {
  try {
    const hotProducts = await db.select({
      id: products.id,
      product_name: products.product_name
    }).from(products).where(eq(products.is_hot, true));
    res.json(hotProducts);
  } catch (error) {
    console.error('Error fetching hot products:', error);
    res.status(500).json({ error: 'Failed to fetch hot products' });
  }
});

app.get('/api/products/is_cold', async (req: Request, res: Response) => {
  try {
    const coldProducts = await db.select({
      id: products.id,
      name: products.product_name,
      origin: products.origin,
    }).from(products).where(eq(products.is_hot, false))
    res.json(coldProducts);

  } catch (error) {
    console.error('Error fetching cold products:', error);
    res.status(500).json({ error: 'Failed to fetch cold products' });
  }
})

// 在 Drizzle ORM 中，where 和 eq 是常用的查询条件组合。让我解释一下这些查询方法：
// where 用于添加查询条件
// eq 是 "equals" 的缩写，用于精确匹配
// 还有其他常用的条件操作符：
// ne (not equal): 不等于
// gt (greater than): 大于
// lt (less than): 小于
// gte (greater than or equal): 大于等于
// lte (less than or equal): 小于等于
// like: 模糊匹配
// in: 在某个列表中



// 404 处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 