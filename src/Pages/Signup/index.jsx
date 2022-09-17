import React from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Notification from '../../Components/Notification/Notification.jsx';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from './Services/SignupServices.jsx';

export default function Signup() {

  const alert = new Notification();
  const navigate = useNavigate();

  const signupHandler = async (signupCredentials) => {
    const user = await signup(signupCredentials);
    console.log(user)
    if (user.data) {
      navigate('/login');
    }
    alert.notify(user.status, user.msg);
  }

  return (
    <Container fluid className='signup-main'>
      <Row className='signup-wrapper'>
        <Col xl={5} className='signup-bg'></Col>
        <Col xl={7} className='signup-form py-5'>
          <Formik
            initialValues={{ fName: '', lName: '', email: '', contact: '', password: '', cnfPassword: '' }}
            validationSchema={Yup.object({
              fName: Yup.string()
                .required('Required'),
              lName: Yup.string()
                .required('Required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
              contact: Yup.string()
                .typeError("Invalid phone number")
                .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid phone number')
                .required('Required'),
              password: Yup.string()
                .required('No password provided')
                .min(8, 'Password is too short')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Hint : User@123'),
              cnfPassword: Yup.string()
                .when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Not matched !"
                  ),
                })
                .required('Required')

            })}

            onSubmit={async (values) => {
              const { cnfPassword, ...signupCredentials } = values;
              signupHandler(signupCredentials);
            }}
          >
            <Form className='mx-auto pe-5' autoComplete="off">
              <h2 className='mb-5 signup-title'>Welcome to SmartClick</h2>
              <Row>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='fName' className='font-weight-bold form-label'>First Name :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="fName" />
                      </div>
                    </div>
                    <Field className='input-field' name='fName' type="text" placeholder='First Name' />
                  </div>
                </Col>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='lName' className='font-weight-bold form-label'>Last Name :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="lName" />
                      </div>
                    </div>
                    <Field className='input-field' name='lName' type="text" placeholder='Last Name' />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='email' className='font-weight-bold form-label'>Email :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <Field className='input-field' name='email' type="email" placeholder='Email' />
                  </div>
                </Col>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='contact' className='font-weight-bold form-label'>Contact :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="contact" />
                      </div>
                    </div>
                    <Field className='input-field' name='contact' type="number" placeholder='Contact' />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='password' className='font-weight-bold form-label'>Password :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <Field className='input-field' name='password' type="password" placeholder='Password' />
                  </div>
                </Col>
                <Col>
                  <div className='mt-3'>
                    <div className='d-flex justify-content-between mb-2'>
                      <label htmlFor='cnfPassword' className='font-weight-bold form-label'>Confirm Password :</label>
                      <div className='text-danger text-end'>
                        <ErrorMessage name="cnfPassword" />
                      </div>
                    </div>
                    <Field className='input-field' name='cnfPassword' type="password" placeholder='Confirm Password' />
                  </div>
                </Col>
              </Row>

              <div className='mt-4 text-end'>
                <Link to='/login' className='login-link'>Already have an account? Login</Link>
              </div>

              <div className='w-100'>
                <button type='submit' className='btn btn-basic mx-auto d-block mt-5 px-3'>Sign up<i className="fa fa-sign-in ps-2"></i></button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}