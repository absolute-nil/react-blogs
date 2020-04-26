import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from "lodash";

export const getPostAndUser = () => async (dispatch,getState) => {
    await dispatch(getPosts())
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id=>dispatch(getUsers(id)))
        .value()
}

export const getPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({type:'FETCH_POSTS',payload:response.data})
}

export const getUsers = (id) => async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:'FETCH_USERS',payload:response.data})
}