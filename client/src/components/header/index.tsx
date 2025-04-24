import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <nav className="w-full bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-coffee text-red-500 text-2xl"></i>
            <Link to="/" className="text-xl font-bold">CaféBliss</Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex items-center justify-center space-x-8 mx-8">
            <Link to="/" className="text-gray-900 hover:text-red-500 transition font-medium">首页</Link>
            <Link to="/coffee" className="text-gray-900 hover:text-red-500 transition font-medium">咖啡系列</Link>
            <Link to="/products" className="text-gray-900 hover:text-red-500 transition font-medium">精选周边</Link>
            <Link to="/about" className="text-gray-900 hover:text-red-500 transition font-medium">关于我们</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button className="text-gray-700 hover:text-red-500 transition">
              <FiSearch className="h-6 w-6" />
            </button>

            {/* User Icon */}
            <button className="text-gray-700 hover:text-red-500 transition">
              <FiUser className="h-6 w-6" />
            </button>

            {/* Shopping Bag Icon */}
            <button className="text-gray-700 hover:text-red-500 transition relative">
              <FiShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;


//Tailwind 的常用功能类名规律：
//1.尺寸类：
//w-full：占据父元素的全部宽度
//w-1/2：占据父元素的一半宽度
//w-1/3：占据父元素的三分之一宽度
//w-1/4：占据父元素的四分之一宽度
//w-1/5：占据父元素的五分之一宽度

//2.颜色类：
//bg-white：白色背景
//text-gray-700：灰色文本
//text-red-500：红色文本
//3.间距类：
//p-4：内边距为4

//3.布局类：
//flex：弹性布局
//flex-row：水平排列
//flex-col：垂直排列
//flex-wrap：换行
//flex-nowrap：不换行

//4.对齐类：
//items-center：水平居中对齐
//justify-between：两端对齐
//justify-center：水平居中对齐
//justify-end：右对齐
//justify-start：左对齐

//5.响应式类：
//hidden：隐藏元素
//block：显示元素
//sm:hidden：在小型设备上隐藏元素
//md:hidden：在中型设备上隐藏元素

//6.响应式类：
//sm:flex：在小型设备上显示为弹性布局
//md:flex：在中型设备上显示为弹性布局
//lg:flex：在大型设备上显示为弹性布局

//7.状态类：
//hover:text-red-500：鼠标悬停时显示红色文本
//active:text-blue-500：点击时显示蓝色文本
//focus:text-green-500：聚焦时显示绿色文本
//disabled:text-gray-400：禁用时显示灰色文本
//hover:bg-blue-600  // 悬停时的背景色
//hover:text-red-500  // 悬停时的文本颜色
//hover:border-red-500  // 悬停时的边框颜色
//hover:shadow-md  // 悬停时的阴影效果
//hover:scale-105  // 悬停时的缩放效果
//hover:rotate-1  // 悬停时的旋转效果
//hover:opacity-80  // 悬停时的透明度

//8.动画类：
//transition：过渡动画
//transition-all：所有属性过渡
//transition-colors：颜色过渡
//transition-opacity：透明度过渡
//transition-transform：变换过渡
