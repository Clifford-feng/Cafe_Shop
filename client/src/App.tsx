import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header'
import CoffeeList from './components/main/CoffeeList'
import CoffeeDetails from './components/CoffeePage/CoffeeDetails'

// 主应用组件
const App: React.FC = () => {
  // 状态管理
  const [showCoffeeList, setShowCoffeeList] = useState(false);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<number | null>(null);

  // 处理咖啡选择
  const handleCoffeeSelect = (coffeeId: number) => {
    setSelectedCoffeeId(coffeeId);
  };

  // 返回咖啡列表
  const handleBackToList = () => {
    setSelectedCoffeeId(null);
  };

  // 返回首页
  const handleBackToHome = () => {
    setSelectedCoffeeId(null);
    setShowCoffeeList(false);
  };

  // 渲染页面
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* 根据状态显示不同内容 */}
        {!showCoffeeList ? (
          // 首页/欢迎页面
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
                  onClick={() => setShowCoffeeList(true)}
                  className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition transform hover:scale-105"
                >
                  立即选购
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 咖啡列表和详情页面
          <div className="container mx-auto px-4 py-8">
            {selectedCoffeeId === null ? (
              // 咖啡列表页面
              <>
                <div className="mb-6">
                  <button
                    onClick={handleBackToHome}
                    className="flex items-center text-gray-600 hover:text-red-500 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    返回首页
                  </button>
                </div>
                <CoffeeList onCoffeeSelect={handleCoffeeSelect} />
              </>
            ) : (
              // 咖啡详情页面
              <CoffeeDetails coffeeId={selectedCoffeeId} onBack={handleBackToList} />
            )}
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
