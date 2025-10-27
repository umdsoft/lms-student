import api from '@/api';

export function useApi() {
  const get = (url, config) => api.get(url, config);
  const post = (url, data, config) => api.post(url, data, config);
  const put = (url, data, config) => api.put(url, data, config);
  const patch = (url, data, config) => api.patch(url, data, config);
  const remove = (url, config) => api.delete(url, config);

  return { get, post, put, patch, remove };
}
