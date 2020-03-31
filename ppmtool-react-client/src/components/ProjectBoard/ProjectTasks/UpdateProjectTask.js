import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getProjectTask,
  updateProjectTask
} from '../../../actions/backlogActions';
import PropTypes from 'prop-types';

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      projectSequence: '',
      summary: '',
      acceptanceCriteria: '',
      status: '',
      priority: '',
      dueDate: '',
      projectIdentifier: '',
      errors: {},
      created_At: ''
    };
  }

  componentDidMount() {
    const { bl_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(bl_id, pt_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      created_At
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      created_At
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newProjectTask = {
      ...this.state
    };

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      newProjectTask,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='add-PBI'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className='btn btn-light'
              >
                Back to Project Board
              </Link>
              <h4 className='display-4 text-center'>Update Project Task</h4>
              <p className='lead text-center'>
                Project Name: {this.state.projectIdentifier} + Project Task ID:
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.summary
                    })}
                    name='summary'
                    placeholder='Project Task summary'
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className='invalid-feedback'>{errors.summary}</div>
                  )}
                </div>
                <div className='form-group'>
                  <textarea
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.acceptanceCriteria
                    })}
                    placeholder='Acceptance Criteria'
                    name='acceptanceCriteria'
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.dueDate
                    })}
                    name='dueDate'
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className={classnames('form-control form-control-lg', {
                      'is-valid': errors.priority
                    })}
                    name='priority'
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className='form-group'>
                  <select
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.status
                    })}
                    name='status'
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value=''>Select Status</option>
                    <option value='TO_DO'>TO DO</option>
                    <option value='IN_PROGRESS'>IN PROGRESS</option>
                    <option value='DONE'>DONE</option>
                  </select>
                </div>

                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  project_task: state.backlog.project_task
});

UpdateProjectTask.propTypes = {
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
