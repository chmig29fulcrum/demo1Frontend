import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';

function Login() {
  const navigate = useNavigate();
  const { userInfo, pending, error, errorText } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleFormSubmit = (data) => {
    console.log('submit');
    login({ email: data.email, password: data.password }, dispatch).then(() => {
      if (!error) navigate('/');
      else console.log(error);
    });
  };

  const options = {
    email: {
      pattern: {
        value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
        message: 'Invalid email',
      },
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 1,
        message: 'Password must have at least 1 characters',
      },
    },
  };

  return (
    <div className='container mt-4'>
      {' '}
      {/* Add margin-top here */}
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title text-center'>Log In</h2>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    name='email'
                    {...register('email', options.email)}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    name='password'
                    {...register('password', options.password)}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className='text-danger'>{errorText}</div>
                <div className='form-group text-center'>
                  <button type='submit' className='btn btn-primary my-3'>
                    Log In
                  </button>
                </div>
                <div className='form-group text-center'>
                  <Link to='/signup'>Don't have an account? Sign up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
