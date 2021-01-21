import React, { useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import Auth from '@aws-amplify/auth';
import Typography from '@material-ui/core/Typography';

import { Input, Button } from '../Form';
import Title from '../Title';
import Loader from '../Loader';
import useStyles from './style';

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter valid email address.')
    .required('required'),
});

function ForgetPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  /* cancelButtonHandler to redirect
   to main login screen  */

  // const cancelBtnHandler = () => {
  //   history.push('/');
  // };

  const showLoader = () => setLoader(true);
  const hideLoader = () => setLoader(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { email } = values;

        showLoader();

        const forgetPassword = await Auth.forgotPassword(email);

        hideLoader();
        localStorage.setItem('email', email);

        history.push('/changePassword');
      } catch (error) {
        // console.log('User error');
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
          <Title text="Reset Your Password" />
          <Typography variant="subtitle1">
            Please enter your email to reset your password
          </Typography>
        </div>
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

            {/* <span class="error" style={{ color: 'red' }}>
              {errors.email}
            </span> */}
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
            <>
              <Button
                label="Reset Password"
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
            </>
            <div style={{ marginLeft: '4px' }}>
              <Loader show={loader} size={24} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
