import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { TemplateService } from '../../services';
import NewBuildingForm from '../NewBuildingForm';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';

import { Button, Input } from '../Form';
import Title from '../Title';
import Loader from '../Loader';

import useStyles from './style';
import { template } from 'lodash-es';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewBuildingTemplates(props) {
  const classes = useStyles();
  const { open, handleClose, refetchBuildings } = props;
  const [isopen, setIsOpen] = useState(false);
  const [showerror, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingTemplates, setFetchingTemplates] = useState(false);
  const [templates, setTemplates] = useState([]);

  const showLoader = () => setSubmitting(true);
  const hideLoader = () => setSubmitting(false);
  const { templateId, setTemplateId } = useState(1);
  const showNewForm = () => setIsOpen(true);
  const closeNewForm = () => setIsOpen(false);

  const showError = () => setShowError(true);
  const hideError = () => setShowError(false);

  const closeForm = () => {
    handleClose();
  };

  const showForm = () => {
    showNewForm();
    closeForm();
  };

  const fetchTemplates = async () => {
    try {
      setFetchingTemplates(true);

      const { data, status } = await TemplateService.getTemplates();

      setTemplates(data);
      setTemplateId(data.id);
      // console.log('Templates', data);
    } catch (error) {
      // console.log('Error State' + error);
      setFetchingTemplates(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Add New Building
        </DialogTitle>
        <Typography
          component="h5"
          color="textSecondary"
          className={classes.textType}
        >
          Please choose from one of the templates below
        </Typography>
        <DialogContent>
          {templates.map((template) => (
            <Paper className={classes.paper} elevation={5} key={template.id}>
              <div>
                <Typography component="h2">
                  <span onClick={showForm}>{template.name}</span>
                </Typography>
              </div>
            </Paper>
          ))}
        </DialogContent>
        <DialogContent></DialogContent>
        <DialogActions>
          <Loader show={submitting} size={32} />
          <Button label="Cancel" handleClick={closeForm} type="cancel" />
        </DialogActions>
      </Dialog>
      <NewBuildingForm
        open={isopen}
        handleClose={closeNewForm}
        refetch={refetchBuildings}
        templateId={1}
      />
    </>
  );
}

NewBuildingTemplates.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refetchBuildings: PropTypes.func.isRequired,
};
