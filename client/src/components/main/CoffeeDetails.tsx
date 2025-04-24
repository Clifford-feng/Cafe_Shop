import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../common/BackButton';

// 咖啡详情接口
interface CoffeeDetailsProps {
  id: number;
  product_name: string;
  price: number;
  description: string;
  origin: string;
  roasting_level: string;
  image_url: string;
  size?: string | null;
  material?: string | null;
  specifications?: string | null;
  brand?: string | null;
}

const CoffeeDetails: React.FC = () => {
  const [coffeeDetails, setCoffeeDetails] = useState<CoffeeDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffeeDetails = async () => {
      try {
        setLoading(true);
        // 使用完整的URL地址
        const response = await fetch(`http://localhost:3001/api/products/name/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch coffee details: ${response.status}`);
        }
        const data = await response.json();
        console.log('获取到的咖啡详情数据:', data);
        setCoffeeDetails(data);
      } catch (err) {
        console.error('Error fetching coffee details:', err);
        setError('Failed to load coffee details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoffeeDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/coffee');
  };

  if (loading) {
    return <div className="text-center p-10">Loading coffee details...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!coffeeDetails) {
    return <div className="text-center p-10">No coffee details found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 返回按钮 */}
      <BackButton onClick={handleBack} text="返回" className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：主图区域 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img
            src={coffeeDetails.image_url}
            alt={coffeeDetails.product_name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* 右侧：商品信息区域 */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          {/* 商品名称 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {coffeeDetails.product_name}
          </h1>

          {/* 商品价格 */}
          <div className="text-2xl font-bold text-red-600 mb-6">
            ¥{coffeeDetails.price}
          </div>

          {/* 产品特征 */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              {/* 产地信息 */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-500">产地</h3>
                <p className="text-gray-900">{coffeeDetails.origin || '暂无信息'}</p>
              </div>

              {/* 烘焙度信息 */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-500">烘焙度</h3>
                <p className="text-gray-900">{coffeeDetails.roasting_level || '暂无信息'}</p>
              </div>

              {/* 原料信息(如果有) */}
              {coffeeDetails.material && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-sm font-medium text-gray-500">原料</h3>
                  <p className="text-gray-900">{coffeeDetails.material}</p>
                </div>
              )}

              {/* 规格信息(如果有) */}
              {coffeeDetails.size && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-sm font-medium text-gray-500">规格</h3>
                  <p className="text-gray-900">{coffeeDetails.size}</p>
                </div>
              )}
            </div>
          </div>

          {/* 购买按钮 */}
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
            加入购物车
          </button>
        </div>
      </div>

      {/* 下方：产品描述区域 */}
      <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">产品描述</h2>
        <p className="text-gray-700 leading-relaxed">
          {coffeeDetails.description}
        </p>
      </div>
    </div>
  );
};

export default CoffeeDetails;
