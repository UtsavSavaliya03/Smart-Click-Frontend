import React from 'react';
import './ProductDescriptionCard.css';
import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductDescriptionCard(props) {

    const loading = props.loading;
    const productDescription = props.product.description;

    const descriptionLoader = () => {
        return (<Skeleton count={9} height={'40px'} />)
    }

    return (
        <Container fluid>
            <h5 className='mb-4'>Description</h5>
            {loading ? (
                descriptionLoader()
            ) : (
                <div className='description-wrapper'>
                    <Row>
                        <Col xl={5} className='pe-0'>
                            <ul className='p-0 list-title m-0'>
                                <li><i className="fa fa-camera me-2"></i>Rear Camera Lens</li >
                                <li><i className="fa fa-camera me-2"></i>Front Camera Lens</li>
                                <li><i className="fa fa-mobile me-2"></i>Screen Size</li>
                                <li><i className="fa fa-battery-half me-2"></i>Battery Power (In mAH)</li>
                                <li><i className="fa fa-memory me-2"></i>RAM</li>
                                <li><i className="fa fa-hdd me-2"></i>Inbuilt Storage</li>
                                <li><i className="fa fa-atom me-2"></i>Operating System</li>
                                <li><i className="fa fa-weight me-2"></i>Item Weight</li>
                                <li><i className="fa fa-shield-virus me-2"></i>Warranty Details</li>
                            </ul >
                        </Col >
                        <Col xl={7} className='ps-0'>
                            <ul className='p-0 m-0'>
                                <li>{productDescription?.rearCamera}</li>
                                <li>{productDescription?.frontCamera}</li>
                                <li>{productDescription?.screenSize}</li>
                                <li>{productDescription?.battery}</li>
                                <li>{productDescription?.ram}</li>
                                <li>{productDescription?.storage}</li>
                                <li>{productDescription?.os}</li>
                                <li>{productDescription?.weight}</li>
                                <li>{productDescription?.warranty}</li>
                            </ul>
                        </Col>
                    </Row >
                </div >
            )
            }
        </Container >
    )
}