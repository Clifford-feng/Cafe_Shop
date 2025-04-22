import React, { useState, useEffect } from 'react';

// 咖啡数据接口
interface Coffee {
  id: number;
  product_name: string;
  image_url: string;
}

// 组件属性接口
interface CoffeeListProps {
  onCoffeeSelect: (coffeeId: number) => void;
}

// 咖啡列表组件
const CoffeeList: React.FC<CoffeeListProps> = ({ onCoffeeSelect }) => {
  // 状态管理
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取咖啡数据
  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        // 获取咖啡列表数据
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

  // 处理咖啡点击事件
  const handleCoffeeClick = (coffee: Coffee) => {
    onCoffeeSelect(coffee.id);
  };

  // 加载状态显示
  if (loading) return <div className="text-center py-4">Loading...</div>;

  // 错误状态显示
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  // 渲染咖啡列表
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
            {/* 咖啡图片 */}
            <div className="relative">
              <img
                src={coffee.image_url || '/default-coffee.jpg'}
                alt={coffee.product_name}
                className="w-full h-48 object-cover"
              />
              {/* 悬停效果遮罩 */}
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
            </div>

            {/* 咖啡名称 */}
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