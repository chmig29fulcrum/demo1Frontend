import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  userInfo: { userData: {}, token: {} },
  data: [],
  pending: false,
  error: false,
  refreshError: false,
  errorText: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionStart: (state) => {
      state.pending = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.pending = false;
      state.data = action.payload.data.data;
      state.error = false;
    },
    modifyUsersSuccess: (state) => {
      state.pending = false;
      state.error = false;
    },

    actionSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.userData = action.payload.data.user;
      state.userInfo.token = action.payload.token;
      state.error = false;
    },
    actionError: (state, action) => {
      state.error = true;
      state.errorText = action.payload;
      state.pending = false;
    },
    actionRefreshError: (state) => {
      state.refreshError = true;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.data = [];
      state.userInfo.userData = {};
      state.userInfo.token = {};
    },
    /*
    blockUser: (state) => {
      console.log('blocking');
      state.isBlocked = true;
    },
    unblockUser: (state) => {
      state.isBlocked = false;
    },
    checkUserIfBlocked: (state, user) => {
      console.log('checkUserIfBlocked');
      //  console.log(user.payload);

      //  console.log(state.userInfo.userData._id);

      user.payload.map((e) => {
        if (state.userInfo.userData._id == e._id) {
          //     console.log('bingo');
          //     console.log(e.status);
          if (e.status == 'blocked') state.isBlocked = true;
          if (e.status == 'active') state.isBlocked = false;
        }
        //    console.log(e);
      });
    },
    */
    /*
    logout: (state) => {
      state.userInfo.userData = {};
      state.userInfo.token = {};
    },
    */
  },
});
/*
const checkUserIfBlocked = (state, user) => {
  console.log('checkUserIfBlocked');
  console.log(state.userInfo.userData);

  user.map((e) => console.log(e));
};
*/
export const getAllUsers = async (user, dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.get(`${API_URL}/users/`);
    dispatch(getAllUsersSuccess(res.data));
    //console.log(res.data);
  } catch (err) {
    console.log(err);
    if (err.response.status == 403) dispatch(logoutSuccess());
    dispatch(actionError());
  }
};
export const modifyUsers = async (data, dispatch) => {
  //console.log(data);

  dispatch(actionStart());
  try {
    const res = await axios.post(`${API_URL}/users/modifyUsers`, data);

    dispatch(modifyUsersSuccess(res.data));
    //console.log(res.data);
  } catch (err) {
    //console.log(err);

    dispatch(actionError());
  }
};

export const refresh = async (dispatch) => {
  //console.log('refresh');
  dispatch(actionStart());
  try {
    const res = await axios.post(`${API_URL}/users/refresh`, {
      withCredentials: true,
    });
    dispatch(actionSuccess(res.data));
    //  console.log(res.data);
  } catch (err) {
    dispatch(actionRefreshError());
  }
};

export const signup = async (user, dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.post(`${API_URL}/users/signup`, user);
    //console.log('signup success');

    dispatch(actionSuccess(res.data));
    //console.log(res.data);
  } catch (err) {
    dispatch(actionError());
  }
};

export const login = async (user, dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.post(`${API_URL}/users/login`, user);
    dispatch(actionSuccess(res.data));
    //console.log(res.data);
  } catch (err) {
    //console.log(err.response.data.message);

    dispatch(actionError(err.response.data.message));
  }
};

export const logout = async (dispatch) => {
  dispatch(actionStart());
  //console.log('logOut');
  try {
    const res = await axios.get(`${API_URL}/users/logout`);
    dispatch(logoutSuccess(res.data));

    //console.log(res.data.data.data);
    // return res.data;
    //return "SUCCESS"
    // return res.data.data.data;
    //console.log(res.data);
    //  return res.data; //zaglushka
  } catch (err) {
    //console.log(err.response.data);
    throw new Error('An error occurred while fetching logOut');
  }
};

export const {
  //checkUserIfBlocked,
  //blockUser,
  //unblockUser,
  actionStart,
  getAllUsersSuccess,
  modifyUsersSuccess,
  actionSuccess,
  actionError,
  actionRefreshError,
  logoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
