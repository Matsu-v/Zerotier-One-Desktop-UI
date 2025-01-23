const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetchData: (url, token) => ipcRenderer.invoke('fetchData', { url, token }),
  closeWindow: () => ipcRenderer.invoke('closeWindow'),
  minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
  maximizeWindow: () => ipcRenderer.invoke('maximizeWindow'),
  saveNetworkSettings: (url, token, data ) => ipcRenderer.invoke('saveNetworkSettings', { url, token, data }),
});
