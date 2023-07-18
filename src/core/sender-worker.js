const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');
const sendEmail = require('./sender');
const SendEmailOptions = require('./sender').SendEmailOptions;

if (isMainThread) {
  module.exports = setupEmailSenderWorker;
} else {
  sendEmail(workerData)
    .then((response) => parentPort.postMessage(response))
    .catch((error) => console.error(error));
}

function setupEmailSenderWorker(options = SendEmailOptions) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: options,
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
