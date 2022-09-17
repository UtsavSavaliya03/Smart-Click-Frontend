import React from 'react';
import './ProductCard.css';
import { Row, Col } from 'react-bootstrap';
import { removeProduct, getCart, increaseQuantity, decreaseQuantity } from '../Services/CartServices.jsx';
import { useSetRecoilState } from 'recoil';
import { cartProductAtom } from '../../../Store/globaState.js';
import Notification from '../../../Components/Notification/Notification.jsx';
import currencyFormatter from 'currency-formatter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Productcart(props) {

    const setAllProducts = useSetRecoilState(cartProductAtom);
    const alert = new Notification();
    const loading = props.loading;
    const product = props.product.productId;
    const productQuantity = props.product.quantity;

    const formatCurrency = (currency) => {
        return (
            currencyFormatter.format(currency, { code: 'INR' })
        )
    }

    const removeCartProduct = async () => {
        const cartProduct = await removeProduct(props.product._id);
        if (cartProduct.data) {
            alert.notify(cartProduct.status, cartProduct.msg)
            const allProduct = await getCart(props.product.userId);
            setAllProducts(allProduct.data);
        }
    }

    const increaseQuantityHandler = async () => {
        await increaseQuantity(props.product._id);
        const allProduct = await getCart(props.product.userId);
        setAllProducts(allProduct.data);
    }

    const decreaseQuantityHandler = async () => {
        await decreaseQuantity(props.product._id);
        const allProduct = await getCart(props.product.userId);
        setAllProducts(allProduct.data);
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
        <div className='cart-wrapper p-3'>
            {loading ? (
                productLoader()
            ) : (
                <Row>
                    <Col xl={3}>
                        <div className='cart-header'>
                            <img src={product?.image[0].url} alt="product image" className='cart-img mx-auto d-block' />
                        </div>
                    </Col>
                    <Col xl={9}>
                        <div className='cart-body'>
                            <h5 className='cart-title break-line-2'>{product?.name}</h5>
                            <h5 className='cart-Price m-0'>{formatCurrency(product?.rate)}</h5>
                            <p className='cart-discount m-0 mb-2'>
                                <span className="text-muted mr-3"><del>{formatCurrency(product?.price)}</del></span>
                                <span className="text-success ms-4">{`${product?.discount}% off`}</span>
                            </p>
                            <p className='cart-description text-muted mt-2'>Usually dispatched in 3 days.</p>
                            <div className='d-flex align-items-center mt-2'>
                                <button
                                    className='btn-quantity'
                                    disabled={productQuantity === 1 ? true : false}
                                    onClick={() => decreaseQuantityHandler()}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>
                                <div className='quantity-badge'>{('0' + productQuantity).slice(-2)}</div>
                                <button
                                    className='btn-quantity'
                                    onClick={() => increaseQuantityHandler()}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                                <button className='btn-remove ms-4' onClick={() => removeCartProduct()} >REMOVE</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    )
}