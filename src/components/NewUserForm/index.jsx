import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';

import { Button, Input } from '../Form';
import Title from '../Title';
import Loader from '../Loader';

import { UserService } from '../../services';
import { passwordGenerator } from '../../utils';

import useStyles from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter valid email address.')
    .required('required'),
  name: Yup.string(),
});

export default function NewUserForm(props) {
  const classes = useStyles();
  const { open, handleClose, refetch } = props;
  const [showerror, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showLoader = () => setSubmitting(true);
  const hideLoader = () => setSubmitting(false);

  const showError = () => setShowError(true);
  const hideError = () => setShowError(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { email, name } = values;

        if (submitting) return;
        // show
        showLoader();

        if (showError) hideError();

        const password = passwordGenerator();

        await UserService.addUsers({
          username: email.trim(),
          name: name.trim(),
          password,
        });

        hideLoader();

        handleClose();
        refetch();
      } catch (error) {
        if (error.response.data.statusCode === 400) {
          showError();
        }

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
    resetForm,
  } = formik;

  const closeForm = () => {
    resetForm();
    if (showError) hideError();
    if (submitting) hideLoader();
    handleClose();
  };

  const userAlreadyExistMessage = 'User Already Exist.';

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="New User"
      aria-describedby="Add New User"
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle id="alert-dialog-slide-title">Add New User</DialogTitle>
      <Typography
        variant="body2"
        className={clsx(
          classes.alreadyExist,
          showerror && classes.hideAlreadyExist
        )}
      >
        {userAlreadyExistMessage}
      </Typography>
      <DialogContent>
        <div>
          <div>
            <Title text="Email" size={14} />
          </div>
          <Input
            type="text"
            label="Email"
            placeholder="Enter email"
            id="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
          />
        </div>
      </DialogContent>
      <DialogContent>
        <div>
          <div>
            <Title text="Name" size={14} />
          </div>
          <Input
            type="text"
            label="Name"
            placeholder="Enter name"
            id="name"
            name="name"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : ''}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Loader show={submitting} size={32} />
        <Button
          label="Create"
          handleClick={handleSubmit}
          valid={dirty && isValid}
        />
        <Button label="Cancel" handleClick={closeForm} type="cancel" />
      </DialogActions>
    </Dialog>
  );
}

NewUserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
