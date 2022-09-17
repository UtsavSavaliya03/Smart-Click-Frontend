import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader (CSS)
import { Carousel } from 'react-responsive-carousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductCarousel(props) {

    const loading = props.loading
    const productUrls = props.product.image;

    const carouselLoader = () => {
        return(
            <Skeleton height={'500px'} />
        );
    }

    return (
        <div className='product-carousel-wrapper'>
            {loading ? (
                carouselLoader()
            ) : (
                <Carousel showArrows={false} showThumbs={false}>
                    {
                        productUrls?.map((image, index) => {
                            return (
                                <div key={index}>
                                    <img className='carousel-img' src={image.url} />
                                </div>
                            )
                        })
                    }
                </Carousel>
            )}
        </div>
    )
}