import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, pending, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const options = {
    username: {
      required: 'Username is required',
      minLength: {
        value: 1,
        message: 'Username must have at least 1 character',
      },
    },
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
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (value) =>
        value === getValues('password') ||
        'Confirm password does not match password',
    },
  };

  const handleFormSubmit = (data) => {
    signup(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
      },
      dispatch
    );
    navigate('/');
  };

  return (
    <>
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h2 className='card-title text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className='form-group'>
                    <label>Username</label>
                    <input
                      type='text'
                      className={`form-control ${
                        errors.username ? 'is-invalid' : ''
                      }`}
                      name='username'
                      {...register('username', options.username)}
                    />
                    {errors.username && (
                      <div className='invalid-feedback'>
                        {errors.username.message}
                      </div>
                    )}
                  </div>
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
                  <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                      type='password'
                      className={`form-control ${
                        errors.confirmPassword ? 'is-invalid' : ''
                      }`}
                      name='confirmPassword'
                      {...register('confirmPassword', options.confirmPassword)}
                    />
                    {errors.confirmPassword && (
                      <div className='invalid-feedback'>
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                  <div className='form-group text-center'>
                    <button
                      type='submit'
                      className='btn btn-primary my-3'
                      disabled={pending}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
