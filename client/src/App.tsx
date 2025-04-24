import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import HomePage from './components/main/HomePage'
import CoffeeList from './components/main/CoffeeList'
import CoffeeDetails from './components/main/CoffeeDetails'

// 主应用组件
const App: React.FC = () => {
  // 渲染页面
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffee" element={<CoffeeList />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
          <Route path="/products" element={<div className="container mx-auto p-8">精选周边页面</div>} />
          <Route path="/about" element={<div className="container mx-auto p-8">关于我们页面</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
