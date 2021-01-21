import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import Title from '../../components/Title';
import { Button } from '../../components/Form';
import BuildingList from '../../components/BuildingList';
import { BuildingService } from '../../services';
import NewBuildingTemplate from '../../components/NewBuildingTemplates';

import styles from './style';

class Building extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      fetchingBuildings: false,
      open: false,
      // addBuilding: true,
    };
  }

  componentDidMount() {
    this.fetchBuildings();
  }

  // slideAddBuilding = ()=>{
  //   this.setState(prevState=>{
  //     return{
  //       addBuilding: !prevState.addBuilding,
  //     }
  //   })
  // }

  fetchBuildings = async () => {
    try {
      this.setState({ fetchingBuildings: true });

      const { data, status } = await BuildingService.getBuildings();
      // console.log(data);

      this.setState({ fetchingBuildings: false, buildings: data.data });
    } catch (error) {
      // console.log('Error State' + error);
      this.setState({ fetchingBuildings: false });
    }
  };

  handleClose = () => {
    this.setState((prevState) => {
      return {
        open: !prevState.open,
      };
    });
  };

  render() {
    const { fetchingBuildings, buildings, addBuilding, open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.titleContainer}>
          <Title text="Buildings" />
          <Button handleClick={this.handleClose} label="Add Building" valid />
        </div>
        <BuildingList loading={fetchingBuildings} buildings={buildings} />
        <NewBuildingTemplate
          open={open}
          handleClose={this.handleClose}
          refetchBuildings={this.fetchBuildings}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Building);
