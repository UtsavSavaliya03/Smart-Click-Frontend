import React, { useEffect } from 'react';
import './style.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '../../Store/globaState.js';
import ProductCarousel from './Components/ProductCarousel';
import ServiceCard from './Components/ServiceCard';
import DeliveryInfoCard from './Components/DeliveryInfoCard';
import AboutProductCard from './Components/AboutProductCard';
import ProductDescriptionCard from './Components/ProductDescriptionCard';
import { getProduct } from './Services/ProductServices';
import { useState } from 'react';
import ProductInfoCard from './Components/ProductInfoCard';
import { addToCart } from './Services/ProductServices';
import Notification from '../../Components/Notification/Notification.jsx';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OrderCard from '../Cart/Components/OrderCard';

export default function ViewProduct() {

  const alert = new Notification();
  const search = useLocation().search;
  const user = useRecoilValue(userStateAtom);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [disableCartBtn, setDisableCartBtn] = useState(false);
  const [openAddressCard, setOpenAddressCard] = useState(false);

  const productId = new URLSearchParams(search).get('pid');

  useEffect(() => {
    getOneProduct();
  }, [])

  const getOneProduct = async () => {
    setLoading(true);
    const product = await getProduct(atob(productId));
    setProduct(product.data);
    setLoading(false);
  }

  const addProductToCart = async () => {
    setDisableCartBtn(true);

    const parameters = {
      userId: user._id,
      productId: atob(productId),
    }

    const product = await addToCart(parameters);

    if (product.data) {
      alert.notify(product.status, product.msg)
      setDisableCartBtn(false);
    }
  }

  return (
    <Container fluid className='px-5 py-4 product-main'>
      <Row className='px-5'>
        <Col xl={5}>
          <ProductCarousel product={product} loading={loading} />
          <Row className='pt-4'>
            <Col xl={6}>
              <button
                className="btn btn-warning w-100 font-weight-bold text-white"
                onClick={() => addProductToCart()}
                disabled={disableCartBtn}
              >
                <i className="fa fa-cart-plus me-2"></i> ADD TO CART
              </button>
            </Col>
            <Col xl={6}>
              <button
                className="btn btn-success w-100 font-weight-bold"
                onClick={() => setOpenAddressCard(!openAddressCard)}
              >
                <i className="fa fa-shopping-bag me-2"></i> BUY NOW
              </button>
            </Col>
          </Row>
          <div className='mt-5'>
            <DeliveryInfoCard product={product} />
          </div>
          <div className='mt-4'>
            <ServiceCard />
          </div>
        </Col>
        <Col className='ps-xl-4'>
          <ProductInfoCard product={product} loading={loading} />
          <hr className="p-0 my-4" />
          <AboutProductCard product={product} loading={loading} />
          <hr className="p-0 my-4" />
          <div>
            <ProductDescriptionCard product={product} loading={loading} />
          </div>
        </Col>
      </Row>
      <Offcanvas show={openAddressCard} onHide={() => setOpenAddressCard(!openAddressCard)} placement='end' backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shipping Information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <OrderCard productId={product._id} closeCanvas={() => setOpenAddressCard(!openAddressCard)} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}