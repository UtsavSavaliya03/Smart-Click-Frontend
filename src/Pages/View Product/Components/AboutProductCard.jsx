import React from 'react';
import { Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function AboutProductCard(props) {

    const loading = props.loading;
    const aboutProduct = props.product.about;

    const textLoader = () => {
        return (
            <Skeleton count={15} />
        );
    }

    return (
        <Container fluid>
            <h5>About this Item</h5>
            {loading ? (
                textLoader()
            ) : (
                <div dangerouslySetInnerHTML={{ __html: aboutProduct }}></div>
            )}
        </Container>
    )
}