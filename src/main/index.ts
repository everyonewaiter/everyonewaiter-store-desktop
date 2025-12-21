import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import registerIpcHandlers from "@main/ipcHandlers";
import { app, BrowserWindow, dialog, MessageBoxOptions, shell } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoUpdater.on("update-downloaded", (_) => {
    const option: MessageBoxOptions = {
      type: "question",
      buttons: ["업데이트", "나중에"],
      defaultId: 0,
      title: "UPDATER",
      message: "프로그램 업데이트를 진행하시겠습니까?",
    };

    dialog.showMessageBox(mainWindow, option).then(function (res) {
      if (res.response == 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.everyonewaiter");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  registerIpcHandlers();

  createWindow();
  autoUpdater.checkForUpdates();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
