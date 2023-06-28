const Service = require("node-windows").Service;

const svc = new Service({
  name: "Supervisio-server",
  description: "The Supervisio OPC-UA server",
  script: "C:\\Users\\sardisim\\prog\\nbmes\\server\\src\\App.js",
});

svc.on("install", function () {
  svc.start();
});

svc.install();
