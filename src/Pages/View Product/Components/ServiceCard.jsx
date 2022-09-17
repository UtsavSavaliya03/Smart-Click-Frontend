import React from 'react';
import './ServiceCard.css';
import { Container } from 'react-bootstrap';
import cashOnDelivery from '../../../Assets/cash-on-delivery.png';
import replacement from '../../../Assets/product-replacement-icon.png';
import fastDelivery from '../../../Assets/fast-delivery-icon.png';
import warranty from '../../../Assets/protect-icon.png';
import safeDelivery from '../../../Assets/package-delivered-icon.png';

export default function ServiceCard() {
    return (
        <Container fluid className='border pt-3'>
            <div className="service-card-wrapper">
                <div className='service-card'>
                    <img src={cashOnDelivery} alt="Cash on delivery" />
                    <p className='pt-3 text-center text-primary'>Cash on Delivery</p>
                </div>
                <div className='service-card'>
                    <img src={replacement} alt="Product replacement" />
                    <p className='pt-3 text-center text-primary'>7 Days Replacement</p>
                </div>
                <div className='service-card h-75'>
                    <img src={fastDelivery} alt="Fast delivery" />
                    <p className='pt-3 text-center text-primary'>Fast Delivery</p>
                </div>
                <div className='service-card'>
                    <img src={safeDelivery} alt="Safe delivery" />
                    <p className='pt-3 text-center text-primary'>Safe Delivery</p>
                </div>
                <div className='service-card'>
                    <img src={warranty} alt="Warranty" />
                    <p className='pt-3 text-center text-primary'>1 Year Warranty</p>
                </div>
            </div>
        </Container>
    )
}