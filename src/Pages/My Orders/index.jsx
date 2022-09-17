import React, { useState, useEffect } from 'react';
import './style.css';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userStateAtom, orderedProductAtom } from '../../Store/globaState.js';
import OrderCard from './Components/OrderCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { getOrders } from './Services/OrderServices.jsx'
import Advertisement from './Components/Advertisement';
import noOrderGIF from '../../Assets/no_orders.gif';

export default function MyOrder() {

  const user = useRecoilValue(userStateAtom);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useRecoilState(orderedProductAtom);

  useEffect(() => {
    getOrderedItems();
  }, [user])

  const getOrderedItems = async () => {
    setLoading(true);
    const order = await getOrders(user._id);
    if (order.data) {
      setAllProducts(order.data);
      setLoading(false);
    }
  }

  return (
    <Container fluid className='p-3 order-main'>
      <h2>MY ORDER</h2>
      {allProducts.length === 0 ? (
        <div className='empty-cart-wrapper my-5'>
          <img src={noOrderGIF} alt="empty cart" />
          <h5 className='text-center mt-4'><a href="/">Shop now</a></h5>
        </div>
      ) : (
        <Row>
          <Col xl={9}>
            {
              allProducts?.map((product, index) => {
                return (
                  <OrderCard key={index} product={product} loading={loading} />
                )
              })
            }
          </Col>
          <Col xl={3} className='ps-0 my-4'>
            <Advertisement />
          </Col>
        </Row>
      )}
    </Container>
  )
}