"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var fs = __importStar(require("node:fs/promises"));
var path_1 = __importDefault(require("path"));
var mainWindow = null;
var devToolsWindow = null;
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var isDev;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isDev = process.env.IS_DEV === "true";
                    console.log("isDEV", isDev);
                    mainWindow = new electron_1.BrowserWindow(getWindowOptions(isDev));
                    setupIpcHandlers();
                    mainWindow.on('closed', function () {
                        removeIpcHandlers();
                        closeDevToolsWindow();
                        mainWindow = null;
                    });
                    if (isDev || process.env.DEBUG === "true") {
                        createDevToolsWindow();
                    }
                    return [4 /*yield*/, loadAppContent(isDev)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getWindowOptions(isDev) {
    return {
        width: 800,
        height: 600,
        resizable: true,
        fullscreenable: true,
        maximizable: false,
        movable: true,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            allowRunningInsecureContent: isDev,
            webSecurity: true,
            preload: path_1.default.join(__dirname, './preload.js')
        }
    };
}
function createDevToolsWindow() {
    devToolsWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 1000,
        show: false,
    });
    mainWindow.webContents.setDevToolsWebContents(devToolsWindow.webContents);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    devToolsWindow.setPosition(1000, 100);
    devToolsWindow.show();
    devToolsWindow.on('closed', function () {
        devToolsWindow = null;
    });
}
function closeDevToolsWindow() {
    if (devToolsWindow && !devToolsWindow.isDestroyed()) {
        devToolsWindow.close();
    }
    devToolsWindow = null;
}
function loadAppContent(isDev) {
    return __awaiter(this, void 0, void 0, function () {
        var htmlPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isDev) return [3 /*break*/, 2];
                    return [4 /*yield*/, mainWindow.loadURL("http://localhost:5173")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    htmlPath = path_1.default.resolve(__dirname, '../dist/index.html');
                    console.log('Loading HTML from:', htmlPath);
                    return [4 /*yield*/, mainWindow.loadURL("file://".concat(htmlPath))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function setupIpcHandlers() {
    electron_1.ipcMain.handle("dialog:openDirectory", handleOpenDirectory);
    electron_1.ipcMain.handle("dialog:openFile", handleOpenFile);
    electron_1.ipcMain.handle("read-files", handleReadFiles);
    electron_1.ipcMain.handle('get-files-in-directory', handleGetFilesInDirectory);
    electron_1.ipcMain.handle('show-item-in-folder', handleShowItemInFolder);
    electron_1.ipcMain.handle('join-paths', handleJoinPaths);
    electron_1.ipcMain.handle('write-file', handleWriteFile);
    electron_1.ipcMain.handle('close-app', handleCloseApp);
    electron_1.ipcMain.handle('get-app-version', handleGetAppVersion);
    electron_1.ipcMain.handle('read-file', handleReadFile);
    electron_1.ipcMain.handle('close-window', handleCloseWindow);
}
function removeIpcHandlers() {
    electron_1.ipcMain.removeHandler("dialog:openDirectory");
    electron_1.ipcMain.removeHandler("dialog:openFile");
    electron_1.ipcMain.removeHandler("read-files");
    electron_1.ipcMain.removeHandler('get-files-in-directory');
    electron_1.ipcMain.removeHandler('show-item-in-folder');
    electron_1.ipcMain.removeHandler('join-paths');
    electron_1.ipcMain.removeHandler('write-file');
    electron_1.ipcMain.removeHandler('close-app');
    electron_1.ipcMain.removeHandler('get-app-version');
    electron_1.ipcMain.removeHandler('read-file');
    electron_1.ipcMain.removeHandler('close-window');
}
// 新的处理函数
function handleOpenDirectory() {
    return electron_1.dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(function (result) { return result.filePaths; });
}
function handleOpenFile() {
    return electron_1.dialog.showOpenDialog(mainWindow, { properties: ['openFile'] }).then(function (result) { return result.filePaths; });
}
function handleShowItemInFolder(event, filePath) {
    return filePath && electron_1.shell.showItemInFolder(path_1.default.normalize(filePath));
}
function handleJoinPaths(event) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return path_1.default.join.apply(path_1.default, paths);
}
function handleGetAppVersion() {
    return electron_1.app.getVersion();
}
function handleReadFile(event, filePath) {
    return fs.readFile(filePath, 'utf8');
}
function handleCloseApp() {
    electron_1.app.quit();
}
function handleCloseWindow() {
    mainWindow.close();
}
function handleReadFiles(event_1, dirPath_1) {
    return __awaiter(this, arguments, void 0, function (event, dirPath, suffix) {
        var files, combinedData, _i, files_1, file, filePath, fileContent, error_1;
        if (suffix === void 0) { suffix = ".json"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fs.readdir(dirPath)];
                case 1:
                    files = _a.sent();
                    combinedData = {};
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 5];
                    file = files_1[_i];
                    if (path_1.default.extname(file) !== suffix)
                        return [3 /*break*/, 4];
                    filePath = path_1.default.join(dirPath, file);
                    return [4 /*yield*/, fs.readFile(filePath, 'utf8')];
                case 3:
                    fileContent = _a.sent();
                    try {
                        combinedData[file] = JSON.parse(fileContent);
                    }
                    catch (parseError) {
                        console.error("\u89E3\u6790\u6587\u4EF6 ".concat(file, " \u5931\u8D25:"), parseError);
                        combinedData[file] = null;
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, combinedData];
                case 6:
                    error_1 = _a.sent();
                    console.error('读取文件失败:', error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function handleGetFilesInDirectory(event, dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readdir(dirPath)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_2 = _a.sent();
                    console.error('读取目录失败:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleWriteFile(event, filePath, content, format) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(content instanceof Uint8Array)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.writeFile(filePath, Buffer.from(content))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(typeof content === 'string')) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.writeFile(filePath, content, format ? { encoding: format } : undefined)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error('Unsupported content type');
                case 5: return [2 /*return*/, true];
                case 6:
                    error_3 = _a.sent();
                    console.error('写入文件失败:', error_3);
                    throw error_3;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function setupAppEventListeners() {
    electron_1.app.on('window-all-closed', handleWindowAllClosed);
    electron_1.app.on('activate', handleActivate);
    electron_1.app.on('before-quit', handleBeforeQuit);
}
function handleWindowAllClosed() {
    closeDevToolsWindow();
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
}
function handleActivate() {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}
function handleBeforeQuit() {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.removeAllListeners('closed');
        mainWindow.close();
    }
    mainWindow = null;
    closeDevToolsWindow();
}
function initApp() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.app.whenReady()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createWindow()];
                case 2:
                    _a.sent();
                    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
                    setupAppEventListeners();
                    return [2 /*return*/];
            }
        });
    });
}
initApp().catch(console.error);
