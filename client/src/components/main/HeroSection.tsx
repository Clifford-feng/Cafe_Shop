import React from 'react';
import { useNavigate } from 'react-router-dom';

// Hero 部分组件
const HeroSection: React.FC = () => {
  //使用了 React Router 的 useNavigate 钩子
  const navigate = useNavigate(); //获取导航函数

  // 处理"立即选购"按钮点击
  const handleShopNowClick = () => {
    navigate('/coffee');
  };

  return (
    <div className="relative" style={{ height: "70vh" }}>
      {/* 背景图片 */}
      <img
        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80"
        alt="Coffee background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 暗色遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* 内容区域 */}
      <div className="relative h-full flex flex-col justify-center px-12 md:px-24 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">品味生活<br />从一杯好咖啡开始</h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-lg">探索我们精心挑选的咖啡豆，感受来自世界各地的独特风味。</p>
        <div>
          <button
            onClick={handleShopNowClick}
            className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition transform hover:scale-105"
          >立即选购
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 