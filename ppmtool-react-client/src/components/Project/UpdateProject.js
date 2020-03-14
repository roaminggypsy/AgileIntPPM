import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getProject, createProject } from '../../actions/projectActions';

class UpdateProject extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      projectName: '',
      projectIdentifier: '',
      description: '',
      start_date: '',
      end_date: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProject(this.props.match.params.id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      ...this.state
    };

    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className='project'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h5 className='display-4 text-center'>Create Project form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.projectName
                      })}
                      placeholder='Project Name'
                      name='projectName'
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    {errors.projectName && (
                      <div className='invalid-feedback'>
                        {errors.projectName}
                      </div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.projectIdentifier
                      })}
                      placeholder='Unique Project ID'
                      disabled
                      name='projectIdentifier'
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    {errors.projectIdentifier && (
                      <div className='invalid-feedback'>
                        {errors.projectIdentifier}
                      </div>
                    )}
                  </div>
                  <div className='form-group'>
                    <textarea
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.description
                      })}
                      placeholder='Project Description'
                      name='description'
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.description && (
                      <div className='invalid-feedback'>
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <h6>Start Date</h6>
                  <div className='form-group'>
                    <input
                      type='date'
                      className='form-control form-control-lg'
                      name='start_date'
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className='form-group'>
                    <input
                      type='date'
                      className='form-control form-control-lg'
                      name='end_date'
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

UpdateProject.propTypes = {
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
