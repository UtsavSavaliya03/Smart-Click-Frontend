import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Notification from '../Notification/Notification.jsx';
import { routeData } from './Routes/RouteData.js';

export default function Routers() {
    return (
        <div>
            <Routes>
                {
                    routeData?.map((route, index) => {
                        return (
                            <Route key={index} element={<route.route />} >
                                <Route path={route.path} element={<route.element />} />
                            </Route>
                        )
                    })
                }
            </Routes>
            <Notification />
        </div>
    )
}
