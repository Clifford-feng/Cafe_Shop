import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import CoffeeList from './components/main/CoffeeList'
import CoffeeDetails from './components/CoffeePage/CoffeeDetails'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<CoffeeList />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
          {/* 后续可以添加更多路由 */}
          {/* <Route path="/coffee/:id" element={<CoffeeDetail />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
