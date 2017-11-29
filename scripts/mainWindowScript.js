//const {ipcRenderer} = electron;
let mainManager = null;
let currentSettings = null;

function saveNewReportHandler() {
    const newRepoprt = mainManager.getReport();
    if (newRepoprt.length === 5
        && newRepoprt.every(reportElement => reportElement != "")) {
        writeRow(newRepoprt)
            .then(() => {
                console.log('File is written');
                ipcRenderer.send('mainWindow:hide', {});
                mainManager.resetFields();
            })
            .catch(err => alert("Error of record saving. Try to close report file and save record again.\r\n" + err));
    } else {
        alert("You didn't fill some field. Please fill all fields and save record again.");
    }
}

function startNewDayHandler() {
    mainManager.startNewDay();
}

function minimazeHandler() {
    ipcRenderer.send('mainWindow:hide', {});
}

function pauseDayHandler() {
    console.log("pause Day");
}

function nueralClickHandler() {
    ipcRenderer.send('nn:get', {});
}

ipcRenderer.on('nn:to', (e, str) => {
    console.log(str);
    mainManager.neuralReport(str);
});


