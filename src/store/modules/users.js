import { userService } from '@/services/api';

const state = {
  list: [],
  page: 0,
  limit: 20,
  total: 0
};

const mutations = {
  SET_USERS(state, { users, total }) {
    state.list = users;
    state.total = total;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.list.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.list.splice(index, 1, updatedUser);
    }
  },
  DELETE_USER(state, userId) {
    state.list = state.list.filter(user => user.id !== userId);
    state.total--;
  }
};

const actions = {
  async fetchUsers({ commit, state }) {
    try {
      const response = await userService.getUsers(state.page, state.limit);
      commit('SET_USERS', { users: response.data.data, total: response.data.total });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  async updateUser({ commit }, user) {
    try {
      const response = await userService.updateUser(user.id, user);
      commit('UPDATE_USER', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await userService.deleteUser(userId);
      commit('DELETE_USER', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },
  setPage({ commit, dispatch }, page) {
    commit('SET_PAGE', page);
    dispatch('fetchUsers');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};