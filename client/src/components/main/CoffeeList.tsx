import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


//定义数据类型接口
interface Coffee {
  id: number;
  product_name: string;
  image_url: string;
}

const CoffeeList = () => {
  const navigate = useNavigate();
  //状态管理
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/name');
        if (!response.ok) {
          throw new Error('Failed to fetch coffee names');
        }
        const data = await response.json();
        setCoffees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  // 处理点击事件
  const handleCoffeeClick = (coffee: Coffee) => {
    console.log('Clicked coffee:', coffee);
    // 这里可以添加导航逻辑，例如：
    // navigate(`/coffee/${coffee.id}`);
    navigate(`/coffee/${coffee.id}`);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Coffee Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            onClick={() => handleCoffeeClick(coffee)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                     transition-transform duration-200 ease-in-out hover:scale-105
                     hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={coffee.image_url || '/default-coffee.jpg'}
                alt={coffee.product_name}
                className="w-full h-48 object-cover"
              />
              {/* 添加一个半透明的遮罩层，在悬停时显示 */}
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-600">
                {coffee.product_name}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CoffeeList; 