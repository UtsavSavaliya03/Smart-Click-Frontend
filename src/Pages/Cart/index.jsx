import React from 'react';
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { cartProductAtom } from '../../Store/globaState.js';
import { useRecoilValue, useRecoilState } from 'recoil';
import CartTotal from './Components/CartTotal.jsx';
import ProductCard from './Components/ProductCard.jsx';
import { userStateAtom } from '../../Store/globaState.js';
import { getCart } from './Services/CartServices';
import { useState, useEffect } from 'react';
import emptyGIF from '../../Assets/empty_cart.gif';

export default function Cart() {

  const user = useRecoilValue(userStateAtom);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useRecoilState(cartProductAtom);

  useEffect(() => {
    getCartItems();
  }, [user])

  const getCartItems = async () => {
    setLoading(true);
    const cart = await getCart(user._id);
    if (cart.data) {
      setAllProducts(cart.data);
      setLoading(false);
    }
  }

  return (
    <div className='p-3 cart-main'>
      <h2>MY CART</h2>
      {allProducts.length === 0 ? (
        <div className='empty-cart-wrapper my-5'>
          <img src={emptyGIF} alt="empty cart" />
          <h5 className='text-center mt-4'><a href="/">Shop now</a></h5>
        </div>
      ) : (
        <Row>
          <Col xl={9}>
            {
              allProducts?.map((product, index) => {
                return (
                  <ProductCard key={index} product={product} loading={loading} />
                )
              })
            }
          </Col>
          <Col xl={3}>
            <CartTotal />
          </Col>
        </Row>
      )}
    </div>
  )
}
