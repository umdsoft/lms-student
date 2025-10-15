import api from '@/api';
import { post as csrfPost, put as csrfPut, patch as csrfPatch, del as csrfDelete } from '@/api.csrf';

export function useApi() {
  const get = (url, config) => api.get(url, config);
  const post = (url, data, config) => csrfPost(url, data, config);
  const put = (url, data, config) => csrfPut(url, data, config);
  const patch = (url, data, config) => csrfPatch(url, data, config);
  const remove = (url, config) => csrfDelete(url, config);

  return { get, post, put, patch, remove };
}
