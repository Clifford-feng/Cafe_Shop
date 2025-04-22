import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface CoffeeDetailsProps {
  product_name: string;
  image_url: string;
  price: number;
  size: string | null;
  description: string;
  origin: string;
  roasting_level: string;
  material: string | null;
  specifications: string | null;
  brand: string | null;
}

const CoffeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coffeeDetails, setCoffeeDetails] = useState<CoffeeDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/name/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch coffee details');
        }

        const data = await response.json();
        setCoffeeDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeDetails();
  }, [id]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!coffeeDetails) return <div className="text-center py-4">No coffee details found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 返回按钮 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回
      </button>

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {coffeeDetails.product_name}
          </h1>

          <div className="text-2xl font-bold text-red-600 mb-6">
            ¥{coffeeDetails.price}
          </div>

          {/* 产品特征 */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-500">产地</h3>
                <p className="text-gray-900">{coffeeDetails.origin || '暂无信息'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-500">烘焙度</h3>
                <p className="text-gray-900">{coffeeDetails.roasting_level || '暂无信息'}</p>
              </div>
              {coffeeDetails.material && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-sm font-medium text-gray-500">原料</h3>
                  <p className="text-gray-900">{coffeeDetails.material}</p>
                </div>
              )}
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

      {/* 下方：详细描述区域 */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">商品描述</h2>
        <p className="text-gray-700 leading-relaxed">
          {coffeeDetails.description}
        </p>
        {coffeeDetails.specifications && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">规格说明</h2>
            <p className="text-gray-700 leading-relaxed">
              {coffeeDetails.specifications}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CoffeeDetails;
