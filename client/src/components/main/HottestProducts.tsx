import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';

interface HottestProduct {
  id: number;
  product_name: string;
  description: string;
  original_price: number;
  discount_price: number | null;
  image_url: string;
}

const HottestProducts: React.FC = () => {
  const [coffee, setCoffee] = useState<HottestProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/is_hot');

        if (!response.ok) {
          throw new Error('Failed to fetch hot coffee');
        }

        const data = await response.json();
        setCoffee(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchCoffees();
  }, []);


  // 处理咖啡点击事件
  const handleCoffeeClick = (coffee: HottestProduct) => {
    navigate(`/coffee/${coffee.id}`);
  };

  // 加载状态显示
  if (loading) return <div className="text-center py-4">Loading...</div>;

  // 错误状态显示
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;


  return (
    <section className="py-12 px-8 md:px-16 bg-gray-50">
      {/* 标题区域 */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">畅销产品</h2>
        <a href="/coffee" className="text-red-500 flex items-center">
          查看全部 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </a>
      </div>

      {/* 产品滚动区域 - 添加product-container类去除滚动条 */}
      <div className="flex space-x-6 overflow-x-auto product-container pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {coffee.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer card-hover"
            onClick={() => handleCoffeeClick(product)}
            style={{
              width: 'calc(25% - 1.5rem)',
              minWidth: '280px',
              transform: 'translateY(0)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
            }}
          >
            <div className="relative mb-4">
              <img
                src={product.image_url || '/default-coffee.jpg'}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                热卖
              </span>
            </div>
            <h3 className="font-bold mb-1">{product.product_name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.description ? (product.description.substring(0, 30) + (product.description.length > 30 ? '...' : '')) : ''}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-red-600">¥{product.discount_price || product.original_price}</span>
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('添加到购物车:', product.id);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加自定义样式，隐藏滚动条 */}
      <style jsx>{`
        .product-container::-webkit-scrollbar {
          display: none;
        }
        
        .card-hover:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
        }
      `}</style>
    </section>
  );
}

export default HottestProducts;