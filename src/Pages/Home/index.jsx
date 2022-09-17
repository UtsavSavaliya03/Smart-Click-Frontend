import React from 'react';
import './style.css';
import MainCarousel from './Components/MainCarousel.jsx';
import ProductCard from './Components/ProductCard.jsx';
import { getAllProducts } from './Services/ProductServices.jsx';
import { useRecoilValue } from 'recoil';
import { sidebarStateAtom } from '../../Store/globaState.js';
import { useState, useEffect } from 'react';

export default function Home() {

  const isOpenSidebar = useRecoilValue(sidebarStateAtom);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setLoading(true);
    const product = await getAllProducts();
    setAllProducts(product.data);
    setLoading(false);
  }

  return (
    <div className='p-4 home-main'>
      <div className={`${isOpenSidebar ? 'mb-3' : 'mb-5 pb-4'}`}>
        <MainCarousel />
      </div>
      <div className='product-contaier d-flex justify-content-around flex-wrap'>
        {
          allProducts?.map((product, index) => {
            return (
              <ProductCard key={index} product={product} loading={loading} />
            )
          })
        }
      </div>
    </div>
  )
}