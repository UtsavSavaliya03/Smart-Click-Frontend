import './style.css';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarStateAtom } from '../../Store/globaState.js';
import { useNavigate } from 'react-router-dom';
import useHeaderFooter from './Hooks/useHeaderFooter';
import { useCookies } from 'react-cookie';
import { userStateAtom, cartProductAtom } from '../../Store/globaState.js';
import AxiosService from "../../AxiosService";
import { UserUrls, CartUrls } from '../../Urls.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logo from '../../Assets/sc_title.png';

const axiosService = new AxiosService();

export default function Header() {

    const navigate = useNavigate();
    const user = useRecoilValue(userStateAtom);
    const isVisibleHeaderFooter = useHeaderFooter();
    const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(sidebarStateAtom);
    const [cookies, removeCookie] = useCookies(['userToken', 'isLogin']);
    const [currentUser, setCurrentUser] = useRecoilState(userStateAtom);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const cartItems = useRecoilValue(cartProductAtom);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        userHandler();
    }, [])

    useEffect(() => {
        setCartCount(cartItems.length)
    }, [cartItems])

    const userHandler = async () => {
        setIsUserLoading(true);
        const user = await axiosService.post(UserUrls.findUser(cookies.userToken));
        if (user.data) {
            setCurrentUser(user.data.data);
        }
        setIsUserLoading(false);
    }

    const sidebarHandler = () => {
        setIsOpenSidebar(!isOpenSidebar);
    }

    const handleLogout = () => {
        removeCookie('userToken');
        removeCookie('isLogin');
    }

    return (
        <div>
            {isVisibleHeaderFooter &&
                <div className='nav-bar px-4 py-1'>
                    <Container fluid className='p-0 m-0 d-flex justify-content-between align-items-center'>
                        <div className='p-0 ml-5 d-flex align-items-center'>
                            <i className="fa fa-bars fa-2x sidebar-button" onClick={sidebarHandler}></i>
                            <div className='ms-3'>
                                <img src={logo} alt="logo" height={'45px'} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div
                                className='mx-4 cart-icon'
                                onClick={() => navigate('/cart')}
                            >
                                <i className="fa fa-shopping-cart fa-2x"></i>
                                <sup><span className="cart-badge badge badge-pill badge-primary">{cartCount}</span></sup>
                            </div>
                            {
                                isUserLoading ? (
                                    <div className='user-icon-skeleton-container'>
                                        <Skeleton className='user-icon-skeleton' circle={true} height={40} width={40} />
                                    </div>
                                ) : (
                                    <div className='avatar-wrapper'>
                                        <Avatar className='avatar' size='40' round name={currentUser.fName + " " + currentUser.lName} />
                                        <div className="dropdown">
                                            <ul className="dropdown-content p-0 m-0">
                                                <div className="user row px-4 pt-3 pb-2">
                                                    <div className="col-2">
                                                        <Avatar className="dropdown-avatar" size="50" round name={currentUser.fName + " " + currentUser.lName} />
                                                    </div>
                                                    <div className="col-10 ps-4 pt-1">
                                                        <h6 className="m-0 break-title-1" >{currentUser.fName + ' ' + currentUser.lName}</h6>
                                                        <p className="m-0 text-muted break-title-1" >{currentUser.email}</p>
                                                    </div>
                                                </div>
                                                <hr className='my-2' />
                                                <li>
                                                    <button className='dropdown-button'><i className="fas fa-user me-2"></i>View Profile</button>
                                                </li>
                                                <li>
                                                    <button className='dropdown-button'><i className="fas fa-cog me-2"></i>Settings</button>
                                                </li>
                                                <hr className='my-2' />
                                                <li>
                                                    <button className='dropdown-button' onClick={() => handleLogout()}><i className="fas fa-sign-out me-2"></i>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Container>
                </div>
            }
        </div>
    )
}