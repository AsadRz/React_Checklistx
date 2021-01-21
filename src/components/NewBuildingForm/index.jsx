/* eslint-disable no-console */
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

import { BuildingService } from '../../services';
import { getCurrentDate } from '../../utils';

import useStyles from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = Yup.object({
  name: Yup.string().required('required'),
  email: Yup.string(),
  street: Yup.string(),
  zip: Yup.string(),
  city: Yup.string(),
  floors: Yup.string(),
});

export default function NewBuildingForm(props) {
  const classes = useStyles();
  const { open, handleClose, refetch, templateId } = props;
  const [showerror, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showLoader = () => setSubmitting(true);
  const hideLoader = () => setSubmitting(false);

  const showError = () => setShowError(true);
  const hideError = () => setShowError(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      state: '',
      street: '',
      zip: '',
      city: '',
      floors: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { name, state, street, zip, city, floors } = values;
        console.log(values);

        // return block the backend request.
        return;

        // if (submitting) return;
        // // show
        // showLoader();

        // if (showError) hideError();

        // const opening_date = getCurrentDate();
        // const template_id = templateId;
        // const operation_manager_id = 1;

        // console.log(opening_date, template_id, operation_manager_id);

        // await BuildingService.addBuildings({
        //   name: name.trim(),
        //   state: state.trim(),
        //   street: street.trim(),
        //   zip: zip.trim(),
        //   city: city.trim(),
        //   floors: floors.trim(),
        //   opening_date,
        //   template_id,
        //   operation_manager_id,
        // });

        // hideLoader();

        // handleClose();
        // refetch();
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

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="New Building"
      aria-describedby="Add New Building"
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle id="alert-dialog-slide-title">Add New Building</DialogTitle>

      <DialogContent>
        <div>
          <div>
            <Title text="Name" size={14} />
          </div>
          <Input
            type="text"
            label="Name"
            placeholder="Enter Name"
            id="name"
            name="name"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : ''}
          />
        </div>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <div>
          <div>
            <Title text="State" size={14} />
          </div>
          <Input
            type="text"
            label="State"
            placeholder="Enter State"
            id="state"
            name="state"
            value={values.state}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.state && errors.state ? errors.state : ''}
          />
        </div>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <div>
          <div>
            <Title text="Stree" size={14} />
          </div>
          <Input
            type="text"
            label="Street"
            placeholder="Enter Street"
            id="street"
            name="street"
            value={values.street}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.street && errors.street ? errors.street : ''}
          />
        </div>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <div>
          <div>
            <Title text="Zip Code" size={14} />
          </div>
          <Input
            type="text"
            label="Zip Code"
            placeholder="Enter Zip Code"
            id="zip"
            name="zip"
            value={values.zip}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.zip && errors.zip ? errors.zip : ''}
          />
        </div>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <div>
          <div>
            <Title text="City" size={14} />
          </div>
          <Input
            type="text"
            label="City"
            placeholder="Enter City"
            id="city"
            name="city"
            value={values.city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.city && errors.city ? errors.city : ''}
          />
        </div>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <div>
          <div>
            <Title text="Floor" size={14} />
          </div>
          <Input
            type="text"
            label="Floors"
            placeholder="Enter Floors"
            id="floors"
            name="floors"
            value={values.floors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.floors && errors.floors ? errors.floors : ''}
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

NewBuildingForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  templateId: PropTypes.number,
};
