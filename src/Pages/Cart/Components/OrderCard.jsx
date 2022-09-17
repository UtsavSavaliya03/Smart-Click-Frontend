import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartProductAtom } from '../../../Store/globaState.js';
import { userStateAtom } from '../../../Store/globaState.js'
import { editUserAddress, addOrder, clearCart } from '../Services/CartServices.jsx';
import {UserUrls} from '../../../Urls.js'
import AxiosService from "../../../AxiosService.js";

export default function OrderCard(props) {

    const axiosService = new AxiosService();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['userToken']);
    const [user, setUser] = useRecoilState(userStateAtom);
    const [onEdit, setOnEdit] = useState(false);
    const [userAddress, setUserAddress] = useState([]);
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const cartItems = useRecoilValue(cartProductAtom);

    useEffect(() => {
        setUserAddress(user.address);
    }, [user])

    const addUserAddress = async () => {
        const addressObject = {
            address: address
        }

        const addressResponse = await editUserAddress(user._id, addressObject);

        if (addressResponse.data) {
            setUserAddress([...userAddress, address]);
            setAddress('');
            setOnEdit(!onEdit);

            const user = await axiosService.post(UserUrls.findUser(cookies.userToken));
            if (user.data) {
                setUser(user.data.data);
            }
        }
    }

    const cartItemProvider = () => {
        let products = [];
        cartItems?.map((product) => {
            products.push(product.productId._id)
        })
        if (props.productId !== undefined) {
            return props.productId;
        } else {
            return products;
        }
    }

    const orderHandler = async () => {
        const orderParams = {
            userId: user._id,
            productId: cartItemProvider(),
            address: selectedAddress
        }

        const order = await addOrder(orderParams);
        if (order.data) {
            props.closeCanvas();
            navigate('/myOrder');
            if (props.productId === undefined) {
                const cart = await clearCart(user._id);
            }
        }
    }

    return (
        <Container fluid>
            <div className='text-end'>
                {onEdit ? (
                    <button className='submit-btn' onClick={() => setOnEdit(!onEdit)}><i className='fa fa-angle-double-left me-2'></i>Back</button>
                ) : (
                    <button className='submit-btn' onClick={() => setOnEdit(!onEdit)}><i className='fa fa-plus me-2'></i>Add new</button>
                )}
            </div>
            {
                !onEdit &&
                <div>
                    {(userAddress.length === 0 || userAddress === undefined) ? (
                        <div className='my-5 text-muted text-center'>
                            Please add address for check out.
                        </div>
                    ) : (
                        <div>
                            {userAddress?.map((address, index) => {
                                return (
                                    <div key={index} className='my-3'>
                                        <Form.Check
                                            type='radio'
                                            label={address}
                                            name="address"
                                            onChange={() => { setSelectedAddress(address) }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            }
            {
                onEdit &&
                <div className='mt-3'>
                    <textarea placeholder='Address...' value={address} onChange={(e) => setAddress(e.target.value)} className='address-input' />
                    <div className='text-end mt-2'>
                        <button
                            onClick={() => addUserAddress()}
                            disabled={address === ''}
                            className='submit-btn'
                        >
                            <i className='fa fa-plus me-2'></i>Add
                        </button>
                    </div>
                </div>
            }
            <div className='finish-btn-wrapper px-5'>
                <button
                    className='w-75 ms-4 d-block p-1'
                    disabled={selectedAddress === ''}
                    onClick={() => orderHandler()}
                >
                    Finish
                </button>
            </div>
        </Container>
    )
}
