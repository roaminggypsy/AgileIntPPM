import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectTask extends Component {
  onClick = (backlog_id, pt_id) => {
    this.props.deleteProjectTask(backlog_id, pt_id);
  };

  render() {
    const { project_task } = this.props;
    console.log(project_task);
    let priorityString;
    let priorityClass;

    switch (project_task.priority) {
      case 1:
        priorityClass = 'bg-danger text-light';
        priorityString = 'HIGH';
        break;
      case 2:
        priorityClass = 'bg-warning text-light';
        priorityString = 'MEDIUM';
        break;
      case 3:
        priorityClass = 'bg-info text-light';
        priorityString = 'LOW';
        break;
    }

    return (
      <div className='card mb-1 bg-light'>
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {project_task.projectSequence} -- Priority:{priorityString}
        </div>
        <div className='card-body bg-light'>
          <h5 className='card-title'>{project_task.summary}</h5>
          <p className='card-text text-truncate '>
            {project_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
          >
            <li className='btn btn-primary'>
              <i className='fa fa-edit pr-1'>View / Update</i>
            </li>
          </Link>

          <button
            className='btn btn-danger ml-4'
            onClick={() =>
              this.onClick(
                project_task.projectIdentifier,
                project_task.projectSequence
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, { deleteProjectTask })(ProjectTask);
