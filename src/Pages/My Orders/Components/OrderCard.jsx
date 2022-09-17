import React from 'react';
import './OrderCard.css';
import moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { orderedProductAtom } from '../../../Store/globaState.js';
import { cancelOrder, getOrders } from '../Services/OrderServices.jsx';
import { sidebarStateAtom } from '../../../Store/globaState.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Notification from '../../../Components/Notification/Notification.jsx';
import currencyFormatter from 'currency-formatter';

export default function OrderCard(props) {

    const alert = new Notification();
    const [viewMore, setViewMore] = useState(false);
    const isOpenSidebar = useRecoilValue(sidebarStateAtom);
    const setAllProducts = useSetRecoilState(orderedProductAtom);
    const loading = props.loading;
    const product = props.product.productId;
    const userAddress = props.product.address;

    const cancelOrderHandler = async () => {
        const order = await cancelOrder(props.product._id);
        if (order.data) {
            alert.notify(order.status, order.msg)
            const allProduct = await getOrders(props.product.userId);
            setAllProducts(allProduct.data);
        }
    }

    const formatCurrency = (currency) => {
        return (
            currencyFormatter.format(currency, { code: 'INR' })
        )
    }

    const productLoader = () => {
        return (
            <Row>
                <Col xl={3}>
                    <div className='cart-header ps-3'>
                        <Skeleton height={'200px'} width={'200px'} />
                    </div>
                </Col>
                <Col xl={9}>
                    <Skeleton count={3} height={'25px'} />
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid>
            <div className='order-wrapper p-3'>
                {loading ? (
                    productLoader()
                ) : (
                    <Row>
                        <Col xl={3}>
                            <div className='cart-header'>
                                <img src={product?.image[0].url} alt="product image" className='order-img mx-auto d-block' />
                            </div>
                        </Col>
                        <Col xl={9} className='pe-4'>
                            <div className='cart-body'>
                                <h5 className='cart-title'>{product?.name}</h5>
                                <h5 className='cart-Price m-0'>{formatCurrency(product?.rate)}</h5>
                                <p className='cart-discount m-0 mb-2'>
                                    <span className="text-muted mr-3"><del>{formatCurrency(product?.price)}</del></span>
                                    <span className="text-success ms-4">{`${product?.discount}% off`}</span>
                                </p>
                                <div className='d-flex align-items-center justify-content-between fw-bold mt-4'>
                                    <p className='text-success'>Order Confirmed</p>
                                    <p className='text-muted'>Shipped</p>
                                    <p className='text-muted'>Out For Delivery</p>
                                    <p className='text-muted'>Delivered</p>
                                </div>
                                <div className='muted-line'><div className='success-line'></div></div>
                                <div className='d-flex justify-content-between'>
                                    <button onClick={() => cancelOrderHandler()} className='cancel-btn ps-0'>Cancel Order</button>
                                    {viewMore ? (
                                        <button onClick={() => setViewMore(!viewMore)} className='view-more-btn pe-0'>Hide</button>
                                    ) : (
                                        <button onClick={() => setViewMore(!viewMore)} className='view-more-btn pe-0'>View more</button>
                                    )
                                    }
                                </div>
                            </div>
                        </Col>
                        {viewMore &&
                            <div className={`mt-4 ${isOpenSidebar ? '' : 'px-5'}`}>
                                <Row>
                                    <Col xl={6} className={`pe-5 ${isOpenSidebar ? '' : 'ps-0'}`}>
                                        <h6>Deliverry address :</h6>
                                        <p className='text-muted'>{userAddress}</p>
                                    </Col>
                                    <Col xl={6}>
                                        <h6 className='mt-4'>Deliverry Expected by :</h6>
                                        <p className='text-muted'>{moment(Date()).add(3, 'days').format('LL')}</p>
                                        <h6 className='mt-4'>Deliverry charges :</h6>
                                        <p className='text-success fw-bold'>Free</p>
                                    </Col>
                                </Row>
                            </div>}
                    </Row>
                )}
            </div>
        </Container>
    )
}