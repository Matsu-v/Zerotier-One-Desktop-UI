const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetchData: (url, token) =>
    ipcRenderer.invoke('fetchData', { url, token }),
});
