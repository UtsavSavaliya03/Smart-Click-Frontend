import React, { useEffect, useState } from 'react';
import './CartTotal.css';
import { useRecoilValue } from 'recoil';
import { Row, Col } from 'react-bootstrap';
import currencyFormatter from 'currency-formatter';
import { userStateAtom, cartProductAtom } from '../../../Store/globaState.js'
import { getCartDetails } from '../Services/CartServices.jsx';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import OrderCard from './OrderCard';

export default function CartTotal() {

    const user = useRecoilValue(userStateAtom);
    const cartProduct = useRecoilValue(cartProductAtom);
    const [loading, setLoading] = useState(false);
    const [openAddressCard, setOpenAddressCard] = useState(false);
    const [cartDetails, setCartDetails] = useState([]);

    useEffect(() => {
        getDetails();
    }, [user])

    useEffect(() => {
        getDetails();
    }, [cartProduct])

    const getDetails = async () => {
        setLoading(true);
        const details = await getCartDetails(user._id);
        setCartDetails(details.data);
        setLoading(false);
    }

    const formatCurrency = (currency) => {
        return (
            currencyFormatter.format(currency, { code: 'INR' })
        )
    }

    const renderCardLoader = () => {
        return (
            <Row>
                <Skeleton height={'30px'} count={4} />
                <Skeleton className='w-75 d-block mx-auto mt-5 mb-3 p-1' height={'40px'} />
            </Row>
        )
    }

    return (
        <div className='cart-total-wrapper p-3'>
            <h5>Price Details</h5>
            <hr />
            {loading ? (
                renderCardLoader()
            ) : (
                <>
                    <Row>
                        <Col xl={7}>
                            <p className='title'>Total items</p>
                            <p className='title'>Deliver charges</p>
                            <p className='title'>Amount payable</p>
                        </Col>
                        <Col xl={5}>
                            <p className='text-muted'>{cartDetails?.totalItems}</p>
                            <p className='text-success fw-bold'>Free</p>
                            <p className='text-muted'>{formatCurrency(cartDetails?.totalRate)}</p>
                        </Col>
                    </Row>
                    <p className='mb-0 text-success fw-bold'>Your total savings on this order {formatCurrency(cartDetails?.totalSaving)}</p>
                    <div className='check-out-btn-wrapper'>
                        <button
                            className='w-75 d-block mx-auto mt-5 mb-3 p-1'
                            disabled={cartDetails?.totalItems === 0}
                            onClick={() => setOpenAddressCard(!openAddressCard)}
                        >
                            Check out
                        </button>
                    </div>

                    <Offcanvas show={openAddressCard} onHide={() => setOpenAddressCard(!openAddressCard)} placement='end' backdrop="static">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Shipping Information</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <OrderCard closeCanvas={() => setOpenAddressCard(!openAddressCard)} />
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            )}
        </div>
    )
}