// LocalStorage-based mock that mimics axios' get/post/put/delete returning Promises.
const STORAGE_KEY = 'cvs';

function delay(res) {
  return new Promise((resolve) => setTimeout(() => resolve(res), 200));
}

function read() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function parseBody(data) {
  // data is already plain object because callers pass object not JSON string
  return data;
}

const api = {
  get(url) {
    if (url === '/cvs') {
      return delay({ data: read() });
    }
    // /cvs/:id
    const id = url.split('/').pop();
    const item = read().find((c) => c.id === id);
    return delay({ data: item });
  },
  post(url, data) {
    if (url === '/cvs') {
      const list = read();
      const cv = { id: crypto.randomUUID(), ...data };
      list.push(cv);
      write(list);
      return delay({ data: cv });
    }
    return delay({ data: null });
  },
  put(url, data) {
    const id = url.split('/').pop();
    const list = read().map((cv) => (cv.id === id ? data : cv));
    write(list);
    return delay({ data });
  },
  delete(url) {
    const id = url.split('/').pop();
    write(read().filter((cv) => cv.id !== id));
    return delay({ data: null });
  },
};

export default api;
