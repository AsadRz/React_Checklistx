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

import { Input, Button } from '../../Form';
import Title from '../../Title';
import Loader from '../../Loader';

import { setAuthFlag } from '../../../store/auth';

import useStyles from './style';

const schema = Yup.object({
  password: Yup.string().trim().required('required'),
  newpassword: Yup.string()
    .trim()
    .required('required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
      'Must contain at least 12 characters, one uppercase, one lowercase, one number and one special character'
    ),
  confirmpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('newpassword')], 'Confirm password does not match')
    .required('required'),
});

function ChallengeChangePassword({ setAuthFlag }) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const showLoader = () => setLoader(true);
  const hideLoader = () => setLoader(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      newpassword: '',
      confirmpassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        showLoader();

        const email = store.get('temp_username');

        const user = await Auth.signIn(email, values.password.trim());

        // update password
        await Auth.completeNewPassword(user, values.newpassword.trim());

        store.remove('temp_username');

        hideLoader();

        setAuthFlag({ authenticated: true });

        history.push('/dashboard');
      } catch (error) {
        // loaderContext.hideLoader();
        hideLoader();
      }
    },
  });

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
      </div>

      <div className={classes.login__form_container}>
        <form className={classes.login__form}>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Temporary Password" size={14} />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your temporary password"
              id="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ''}
            />
          </div>

          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="New Password" size={14} />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your new password"
              id="newpassword"
              name="newpassword"
              value={values.newpassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={
                touched.newpassword && errors.newpassword
                  ? errors.newpassword
                  : ''
              }
            />
          </div>

          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Confirm Password" size={14} />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your confirm password"
              id="confirmpassword"
              name="confirmpassword"
              value={values.confirmpassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={
                touched.confirmpassword && errors.confirmpassword
                  ? errors.confirmpassword
                  : ''
              }
            />
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
              label="Change Password"
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

ChallengeChangePassword.propTypes = {
  setAuthFlag: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthFlag: (payload) => {
      dispatch(setAuthFlag(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(ChallengeChangePassword);
