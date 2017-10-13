const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron;

//We do not tie it to anything, we just tell the compiler that this exists
//notice that the mainWindow is defined inside app.on('ready') which
//is a scoping issue.
let mainWindow;

app.on('ready', ()=>{
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
})

ipcMain.on('video:submit', (event, path) =>{
	ffmpeg.ffprobe(path, (err, metadata) =>{
		console.log('Video Duration is: ', metadata.format.duration);
		//Send the property Duration of the file.
		mainWindow.webContents.send('video:metadata', metadata.format.duration);
	});
})