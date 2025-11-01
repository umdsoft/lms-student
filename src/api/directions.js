import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  async getDirections(params = {}) {
    const { data } = await api.get('/directions', { params });
    return data;
  },

  async getStatistics() {
    const { data } = await api.get('/directions/statistics');
    return data;
  },

  async getDirection(id) {
    const { data } = await api.get(`/directions/${id}`);
    return data;
  },

  async createDirection(directionData) {
    return withCsrf(() => api.post('/directions', directionData));
  },

  async updateDirection(id, directionData) {
    return withCsrf(() => api.put(`/directions/${id}`, directionData));
  },

  async updateDirectionStatus(id, status) {
    return withCsrf(() => api.patch(`/directions/${id}/status`, { status }));
  },

  async deleteDirection(id) {
    return withCsrf(() => api.delete(`/directions/${id}`));
  },

  async getSubjects(directionId) {
    const { data } = await api.get(`/directions/${directionId}/subjects`);
    return data;
  },

  async addSubjects(directionId, subjects) {
    return withCsrf(() => api.post(`/directions/${directionId}/subjects`, { subjects }));
  },

  async removeSubject(directionId, subjectId) {
    return withCsrf(() => api.delete(`/directions/${directionId}/subjects/${subjectId}`));
  },

  async getTeachers(directionId) {
    const { data } = await api.get(`/directions/${directionId}/teachers`);
    return data;
  },

  async assignTeachers(directionId, teacherIds) {
    return withCsrf(() => api.post(`/directions/${directionId}/teachers`, { teacherIds }));
  },

  async removeTeacher(directionId, teacherId) {
    return withCsrf(() => api.delete(`/directions/${directionId}/teachers/${teacherId}`));
  }
};
