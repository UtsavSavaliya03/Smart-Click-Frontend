import React from 'react';
import './MainCarousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader (CSS)
import { Carousel } from 'react-responsive-carousel';

export default function MainCarousel() {
    return (
        <div className='carousel-wrapper'>
            <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showThumbs={false} showStatus={false}>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1582046207438-595bf34ebbcf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8c2Ftc3VuZ3x8fHx8fDE2NjExMDE1MTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1598571218239-4bf840970050?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8bW9iaWxlfHx8fHx8MTY2MTEwMTYzNw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1609561954516-fe2972d7c493?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8c2Ftc3VuZ3x8fHx8fDE2NjExMDE0Njc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1644982652063-1a9b8d24f0f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8b3Bwb3x8fHx8fDE2NjExMDE5NzQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1630589248427-2df8605c63be?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8b3Bwb3x8fHx8fDE2NjExMDIxMzE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
                <div>
                    <img className="rounded" src="https://images.unsplash.com/photo-1568378711447-f5eef04d85b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=250&ixid=MnwxfDB8MXxyYW5kb218MHx8c2Ftc3VuZ3x8fHx8fDE2NjExMDE2NjM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1200" />
                </div>
            </Carousel>
        </div>
    )
}