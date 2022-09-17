import React from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notification from '../../Components/Notification/Notification.jsx';
import { login } from './Services/LoginServices.jsx'
import { useSetRecoilState } from 'recoil';
import { userStateAtom } from '../../Store/globaState.js';

export default function Login() {

  const alert = new Notification();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['userToken', 'isLogin']);
  const setCurrentUser = useSetRecoilState(userStateAtom);

  const loginHandler = async (loginCredentials) => {
    const isLogin = await login(loginCredentials);
    if (isLogin.data) {
      setCurrentUser(isLogin.data);
      setCookie("userToken", isLogin.data.token, { path: '/' });
      setCookie("isLogin", true, { path: '/' });
      navigate('/');
    }
    alert.notify(isLogin.status, isLogin.msg);
  }

  return (
    <Container fluid className='login-main'>
      <Row className='login-wrapper'>
        <Col xl={7} className='login-bg'></Col>
        <Col xl={5} className='login-form py-5'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address.')
                .required('Required.'),
              password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short.')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  'Hint : User@123')
            })}

            onSubmit={async (values) => {
              loginHandler(values);
            }}
          >
            <Form className='mx-auto p-5' autoComplete="off">
              <h2 className='mb-5 login-title'>Welcome to SmartClick</h2>
              <div className='mt-3'>
                <div className='d-flex justify-content-between mb-2'>
                  <label htmlFor='email' className='font-weight-bold form-label'>Email :</label>
                  <div className='text-danger text-end'>
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <Field className='input-field' name='email' type="email" placeholder='Email' />
              </div>

              <div className='mt-3'>
                <div className='d-flex justify-content-between mb-2'>
                  <label htmlFor='password' className='font-weight-bold form-label'>Password :</label>
                  <div className='text-danger text-end'>
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <Field className='input-field' name='password' type="password" placeholder='Password' />
              </div>

              <div className='mt-4 text-end'>
                <Link to='/signup' className='signup-link'>Don't have an account? Sign Up</Link>
              </div>

              <div className='w-100'>
                <button type='submit' className='btn btn-basic mx-auto d-block mt-5 px-3'>Login<i className="fa fa-sign-in ps-2"></i></button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}