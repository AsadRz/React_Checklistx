/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import store from 'store';
import Auth from '@aws-amplify/auth';

import { Input, Button } from '../Form';
import Title from '../Title';
import Loader from '../Loader';

import { setAuthFlag } from '../../store/auth';

import useStyles from './style';

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter valid email address.')
    .required('required'),
  password: Yup.string().trim().required('required'),
});

function LoginForm({ setAuthFlag }) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const showLoader = () => setLoader(true);
  const hideLoader = () => setLoader(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;

        showLoader();
        const user = await Auth.signIn(email.trim(), password.trim());
        hideLoader();

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          store.set('temp_username', email.trim());

          history.push('/setNewPassword');

          return;
        }

        setAuthFlag({ authenticated: true });

        history.push('/dashboard');
      } catch (error) {
        if (error.message.includes('User is disabled by the administrator')) {
          // toastContext.alert(
          //   'error',
          //   'Account disabled',
          //   'Please contact your administrator.',
          //   true,
          // );
        } else if (error.code === 'NotAuthorizedException') {
          // toastContext.alert('warning', 'Invalid Credentials', error.message);
        } else if (error !== 'No current user') {
          // toastContext.alert(
          //   'error',
          //   'There was a problem',
          //   'Sign in failed, please contact your administrator or try again later.',
          // );
        }
        // loaderContext.hideLoader();
        hideLoader();
      }
    },
  });

  const navigateToForgetPassword = () => {
    history.push('/forgotPassword');
  };

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <div>
      <div className={classes.message_container}>
        <div className={classes.message}>
          <Title text={"We're happy to see you!"} />
        </div>

        {/* <Typography className={classes.message} variant="h5">
          We&apos;re happy to see you!
        </Typography> */}
      </div>

      <div className={classes.login__form_container}>
        <form className={classes.login__form}>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Email" size={14} />
            </div>
            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : ''}
            />
          </div>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Password" size={14} />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ''}
            />
          </div>
          <div
            className={classes.login__form_field}
            onClick={navigateToForgetPassword}
          >
            <div className={classes.forget_password}>
              <Title text="Forgot your password?" size={12} />
            </div>
          </div>
          <div
            className={classes.login__form_field}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              height: 36,
              alignItems: 'center',
            }}
          >
            <Button
              label="Sign in"
              id="submit"
              valid={dirty && isValid}
              handleClick={handleSubmit}
            />
            <div style={{ marginLeft: '4px' }}>
              <Loader show={loader} size={24} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setAuthFlag: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthFlag: (payload) => {
      dispatch(setAuthFlag(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
