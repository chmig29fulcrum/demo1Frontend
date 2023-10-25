import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout, getAllUsers, modifyUsers } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const users = useSelector((state) => state.user.data) || [];

  const error = useSelector((state) => state.user.error);

  // State to keep track of selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        // If the user is already selected, remove them
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        // If the user is not selected, add them
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleAction = (actionType) => {
    if (selectedUsers.length === 0) {
      alert('Please select users to perform the action on.');
      return;
    }

    modifyUsers({ userIds: selectedUsers, action: actionType }, dispatch);
    getAllUsers({}, dispatch);
  };

  /*
  if (!user || !user.userInfo || !user.userInfo.userData) {
    // User data is not available yet, you can return a loading indicator or redirect
    navigate('/login');
  }
*/
  useEffect(() => {
    //  console.log('useffect');
    /*
    if (user.userData.status === 'blocked') {
      logout(dispatch);
      navigate('/login');
    } else {
      console.log('xaia');
    }
    */
    /*
    console.log(user);
    if (user.userData.status && user.userData.status === 'active') {
      console.log('check');
    } else {
      console.log('xaia');
    }
    */
    // console.log(user.userData.status);
    /*
    if (user.userInfo.userData.status === 'blocked') {
      // Call the logout action
      logout(dispatch);
      // Redirect to the login page
      navigate('/login');
      return;
    }
*/
    getAllUsers({}, dispatch);
  }, [dispatch]);

  return (
    <div className='container my-5'>
      {Object.keys(user.userData).length !== 0 ? (
        <>
          <div>
            <button
              type='submit'
              className='btn btn-primary btn-lg square-button'
              onClick={() => handleAction('block')}
            >
              <span className='btn-icon'>🔒</span> Block
            </button>
            <button
              type='submit'
              className='btn btn-light btn-lg square-button'
              onClick={() => handleAction('unblock')}
            >
              <span className='btn-icon'>🔓</span>
            </button>
            <button
              type='submit'
              className='btn btn-danger btn-lg square-button'
              onClick={() => handleAction('delete')}
            >
              <span className='btn-icon'>🗑️</span>
            </button>
          </div>
          <div className='mt-2'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th className='text-center'>Select</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Last Login</th>
                  <th className='text-center'>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className='text-center'>
                      <input
                        type='checkbox'
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.lastLogin}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {' '}
          <h1 className='text-center mb-4'>User Registry</h1>
        </>
      )}
    </div>
  );
}

export default Home;
