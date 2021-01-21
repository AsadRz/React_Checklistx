import React, { PureComponent } from 'react';
import Title from '../../components/Title';
import TaskList from '../../components/TaskList';
import { TaskService } from '../../services';

class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      fetchingTasks: false,
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      this.setState({ fetchingTasks: true });

      const { data, status } = await TaskService.getTasks();


      this.setState({ fetchingTasks: false, tasks: data });
    } catch (error) {
      this.setState({ fetchingTasks: false });
    }
  };

  render() {
    const { fetchingTasks, tasks } = this.state;
    return (
      <div>
        <Title text="Tasks" />

        <TaskList loading={fetchingTasks} tasks={tasks} />
      </div>
    );
  }
}

export default Tasks;
