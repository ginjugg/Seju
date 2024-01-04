// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector: string, text: string) => {
      const element = document.getElementById(selector);
      if (element) {
        element.innerText = text;
      }
    };
  
    for (const type of ["chrome", "node", "electron"]) {
      replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
    }
  });


  import { contextBridge, ipcRenderer, ipcMain, app, shell } from 'electron'
  import { electronAPI } from '@electron-toolkit/preload'
  
  // Custom APIs for renderer
  const api = {
    setFile: (filepath: string) => ipcRenderer.send('lockfile', filepath),
    openHandles: () => ipcRenderer.send('openHandles'),
    watch: () => ipcRenderer.send('lockfileWatch'),
    requestData: () => ipcRenderer.invoke('requestData'),
    isOpen: () => ipcRenderer.invoke('isOpen'),
    openGithub: () => ipcRenderer.send('openGithub'),
  }
  
  
  
  // Use `contextBridge` APIs to expose Electron APIs to
  // renderer only if context isolation is enabled, otherwise
  // just add to the DOM global.
  if (process.contextIsolated) {
    try {
      console.log('contextbridge gesetzt')
      contextBridge.exposeInMainWorld('electron', electronAPI)
      contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('window.api gesetzt')
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
  
  }