import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// 产品类别接口
interface ProductCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProductCategories: React.FC = () => {
  const navigate = useNavigate();

  // 产品类别数据
  const categories: ProductCategory[] = [
    {
      id: 'coffee-beans',
      title: '精选咖啡豆',
      description: '来自全球顶级咖啡产区的精选咖啡豆，为您带来纯正的味觉体验。',
      imageUrl: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80',
      link: '/coffee'
    },
    {
      id: 'brewing-equipment',
      title: '冲泡装备',
      description: '专业咖啡冲泡器具，让您在家也能享受咖啡馆级别的味觉体验。',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80',
      link: '/products'
    },
    {
      id: 'gift-sets',
      title: '礼品套装',
      description: '精心搭配的咖啡礼品套装，是送给爱人和朋友的完美礼物选择。',
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80',
      link: '/products'
    }
  ];

  // 处理类别点击
  const handleCategoryClick = (link: string) => {
    navigate(link);
  };

  return (
    <section className="py-16 px-8 md:px-16">
      <h2 className="text-3xl font-bold mb-12 text-center">探索我们的产品系列</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer transform hover:scale-[1.01]"
            onClick={() => handleCategoryClick(category.link)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm mb-4">{category.description}</p>
              <div className="text-red-500 flex items-center">
                浏览系列 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories; 