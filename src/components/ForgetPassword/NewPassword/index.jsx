import React, { useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import Auth from '@aws-amplify/auth';
import { Input, Button } from '../../Form';
import Title from '../../Title';
import Loader from '../../Loader';
import useStyles from '../style';
import { Typography } from '@material-ui/core';

const Schema = Yup.object().shape({
  code: Yup.string().required('This field is required'),
  password: Yup.string()
    .trim()
    .required('This field is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
      'Must contain at least 12 characters, one uppercase, one lowercase, one number and one special character'
    ),
  confirmpassword: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same'
    ),
  }),
});

function NewPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const showLoader = () => setLoader(true);
  const hideLoader = () => setLoader(false);

  const Email = localStorage.getItem('email');

  /**
   * Secured Email to be shown beneath the Title in a format like ab****@gmail.com
   */

  let securedEmail = Email.split('@');
  const result = securedEmail[0];
  const length = result.length;
  securedEmail =
    result.slice(0, 2) +
    '*'.repeat(length - 6) +
    result.slice(length - 4, length) +
    '@' +
    securedEmail[1];

  const formik = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      try {
        const { code, password } = values;

        showLoader();

        const newPassword = await Auth.forgotPasswordSubmit(
          Email,
          code,
          password
        );

        hideLoader();
        console.log('user', newPassword);

        history.push('/');
      } catch (error) {
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
    handleReset,
  } = formik;
  return (
    <div>
      <div className={classes.message_container}>
        <div className={classes.message}>
          <Title text={'Enter Your New Password'} />
          <Typography variant="subtitle1">
            An authentication token has been sent to your email address,{' '}
            {securedEmail}
          </Typography>
        </div>
      </div>

      <div className={classes.login__form_container}>
        <form className={classes.login__form}>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Authentication Code" size={14} />
            </div>
            <Input
              type="text"
              label="Code"
              placeholder="Enter authentication code"
              id="code"
              name="code"
              value={values.code}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.code && errors.code ? errors.code : ''}
            />
          </div>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="New Password" size={14} />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="Set your new password"
              id="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ''}
            />
            {/* <span class="error" style={{ color: 'red' }}>
              {errors.password}
            </span> */}
          </div>
          <div className={classes.login__form_field}>
            <div className={classes.label}>
              <Title text="Confirm Password" size={14} />
            </div>
            <Input
              type="password"
              label="confirmpassowrd"
              placeholder="Confirm password"
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
            <React.Fragment>
              <Button
                label="Reset"
                id="submit"
                valid={dirty && isValid}
                handleClick={handleSubmit}
              />
              <Button
                label="Cancel"
                id="cancel"
                className={classes.cancelBtn}
                onClick={handleReset}
                variant="text"
              />
            </React.Fragment>
            <div style={{ marginLeft: '4px' }}>
              <Loader show={loader} size={24} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
