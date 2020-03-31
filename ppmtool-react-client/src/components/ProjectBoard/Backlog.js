import React, { Component } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props;

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    project_tasks_prop.forEach(project_task => {
      const project = (
        <ProjectTask key={project_task.id} project_task={project_task} />
      );

      switch (project_task.status) {
        case 'TO_DO':
          todoItems.push(project);
          break;
        case 'IN_PROGRESS':
          inProgressItems.push(project);
          break;
        case 'DONE':
          doneItems.push(project);
          break;
      }
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-secondary text-white'>
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems}
          </div>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-primary text-white'>
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-success text-white'>
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
