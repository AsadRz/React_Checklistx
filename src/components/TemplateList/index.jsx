import React, { PureComponent } from 'react';
import Title from '../Title';
import { TemplateService } from '../../services';
import classes from './style';
import { get, isEqual } from 'lodash-es';
import DataTable from '../DataTable';
import { withStyles } from '@material-ui/core/styles';
import matchSorter from 'match-sorter';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';

class TemplateList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      fetchingTemplates: false,
      searchValue: '',
      checked: true,
    };
  }

  componentDidMount() {
    this.fetchTemplates();
  }

  onSearch = (value) => this.setState({ searchValue: value });

  toggleTable = () => {
    this.setState((prevState) => {
      return {
        checked: !prevState.checked,
      };
    });
  };

  fetchTemplates = async () => {
    try {
      this.setState({ fetchingTemplates: true });

      const { data, status } = await TemplateService.getTemplates();

      // console.log('Templates', data);

      this.setState({ fetchingTemplates: false, templates: data });
    } catch (error) {
      console.log('Error State' + error);
      this.setState({ fetchingTemplates: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { templates, fetchingTemplates, searchValue, checked } = this.state;
    const columns = [
      {
        Header: 'Name',
        Cell: ({ row }) => {
          let name = get(row, 'original.name', '');
          name = isEqual(name, null) ? '' : name;

          return <div>{name}</div>;
        },

        minWidth: 100,
      },
      {
        Header: 'Created On',
        Cell: ({ row }) => {
          let createdOn = get(row, 'original.created_on', '');
          let date = createdOn.slice(0, 10);
          // console.log(date);
          createdOn = isEqual(createdOn, null) ? '' : date;

          return <div>{createdOn}</div>;
        },

        minWidth: 100,
      },
      {
        Header: 'Updated On',
        Cell: ({ row }) => {
          let updatedOn = get(row, 'original.updated_on', '');
          let date = updatedOn.slice(0, 10);
          // console.log(date);
          updatedOn = isEqual(updatedOn, null) ? '' : date;

          return <div>{updatedOn}</div>;
        },

        minWidth: 100,
      },
    ];

    const record = matchSorter(templates, searchValue.toLocaleLowerCase(), {
      keys: ['name'],
    });

    return (
      <div>
        <Title text="Templates List" size={20} />
        <DataTable
          showPaper={false}
          columns={columns}
          data={record}
          loading={fetchingTemplates}
          searchValue={searchValue}
          onSearch={this.onSearch}
          placeholder="Search for a Template"
        />
      </div>
    );
  }
}

export default withStyles(classes)(TemplateList);
