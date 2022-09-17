import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductCard(props) {

  const navigate = useNavigate();
  const product = props.product;
  const loading = props.loading;

  const formatCurrency = (currency) => {
    return (
      currencyFormatter.format(currency, { code: 'INR' })
    )
  }

  const renderLoader = () => {
    return (
      <div className='card-wrapper p-4' >
        <div className='card-header'>
          <Skeleton height={'200px'} />
        </div>
        <div className='card-body mt-3'>
          <h5><Skeleton count={2} /></h5>
          <h5 className='mt-3'><Skeleton count={2} /></h5>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        renderLoader()
      ) : (
        <div
          className='card-wrapper p-4'
          onClick={() => navigate(`/viewProduct?pid=${btoa(product._id)}`)}
        >
          <div className='card-header'>
            <img src={product.image[0].url} alt="product image" className='card-img mx-auto d-block' />
          </div>
          <div className='card-body mt-3'>
            <h5 className='card-title break-line-2'>{product.name}</h5>
            <h5 className='card-Price mt-3 mb-0'>{formatCurrency(product.rate)}</h5>
            <p className='card-discount  m-0'>
              <span className="text-muted mr-3"><del>{formatCurrency(product.price)}</del></span>
              <span className="text-success ms-4">{`${product.discount}% off`}</span>
            </p>
          </div>
        </div>
      )
      }
    </>
  )
}