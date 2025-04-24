import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

// 组件属性接口
interface BackButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

// 通用返回按钮组件
const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  text = '返回',
  className = 'mb-6'
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-gray-700 hover:text-red-600 transition-colors ${className}`}
    >
      <IoChevronBack className="mr-1" />
      <span>{text}</span>
    </button>
  );
};

export default BackButton; 