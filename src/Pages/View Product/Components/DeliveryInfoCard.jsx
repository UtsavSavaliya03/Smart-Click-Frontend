import React from 'react';
import { Container } from 'react-bootstrap';

export default function DeliveryInfoCard(props) {

    const product = props.product;

    return (
        <Container fluid className='border p-3'>
            <div className='d-flex text-success'>
                <i className="fa fa-map-marker-alt fa-2x"></i>
                <p className='m-0 ps-2 pt-1'>
                    Select your delivery location
                </p>
            </div>
            <div className='pt-2'>
                <p className='text-primary m-0'>FREE Delivery<span className='text-dark ps-2'>{Date()}</span></p>
            </div>
            <div className='pt-2'>
                <p className='m-0'>Usually dispatched in 3 days.</p>
            </div>
            <div className='pt-2'>
                <p className='m-0'>Sold by<span className='text-primary ps-2'>{product.saller || ''}</span></p>
            </div>
        </Container>
    )
}