import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Title from '../../components/Title';

import useStyles from './style';
import useSharedStyles from '../../styles/SharedStyles';

export default function Settings() {
  const sharedStyles = useSharedStyles();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const options = ['General', 'Profile', 'Access Logs'];

  let content = 'General';

  if (selectedIndex === 0) {
    content = 'General';
  } else if (selectedIndex === 1) {
    content = 'Profile';
  } else if (selectedIndex === 2) {
    content = 'Access Logs';
  }

  return (
    <div>
      <Title text="Settings" />
      <div className={sharedStyles.topSpace} />
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Paper className={clsx(sharedStyles.paper, classes.paper)}>
            <List component="nav">
              <div className={clsx(classes.paddingLeft, classes.title)}>
                <Title text="Select Setting" size={22} />
              </div>

              {options.map((option, index) => (
                <ListItem
                  className={clsx(
                    classes.paddingLeft,
                    sharedStyles.tabOptions,
                    selectedIndex === index && sharedStyles.selectedTabOption
                  )}
                  disableGutters
                  button={false}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Paper className={sharedStyles.paper}>{content}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
