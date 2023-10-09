import {
  OPCUAClient,
  MonitoringParametersOptions,
  ClientSubscription,
  DataValue,
  TimestampsToReturn,
  MessageSecurityMode,
  SecurityPolicy,
  ClientMonitoredItemGroup,
  AttributeIds,
  DataType,
  StatusCodes,
  ClientMonitoredItem,
} from "node-opcua";

import { setCycle } from "../db/controller";

const connectionStrategy = {
  initialDelay: 100,
  maxRetry: 1000000,
  maxDelay: 200,
};
const options = {
  applicationName: "MyClient",
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpointMustExist: false,
};

export const endpoints = [
  {
    id: 1,
    url: "opc.tcp://172.17.187.120:4842",
    name: "Pressa collaudo",
    serNum: null,
    mode: null,
    job: null,
    product: null,
    cycleTime: null,
    goodParts: null,
    lotName: null,
    mouldCode: null,
    norminalParts: null,
    numCavities: null,
    alarmStatus: null,
    cycleCount: null,
    cushionStroke: null,
    dosingTime: null,
    injectionTime: null,
  },
];

const monitorStatusItems: { nodeId: string; attributeName: string }[] = [
  {
    //serial number
    nodeId: "ns=2;i=20020",
    attributeName: "Value",
  },
  {
    //machine mode
    nodeId: "ns=2;i=20027",
    attributeName: "Value",
  },
  {
    //job name - file stampo
    nodeId: "ns=2;i=20003",
    attributeName: "Value",
  },
  {
    //product - codice articolo
    nodeId: "ns=2;i=20005",
    attributeName: "Value",
  },
  {
    //good parts
    nodeId: "ns=2;i=20012",
    attributeName: "Value",
  },
  {
    //lot name - codice commessa
    nodeId: "ns=2;i=20022",
    attributeName: "Value",
  },
  {
    //index - codice stampo
    nodeId: "ns=2;i=20037",
    attributeName: "Value",
  },
  {
    //norminal parts - pezzi commessa
    nodeId: "ns=2;i=20006",
    attributeName: "Value",
  },
  {
    //num cavities
    nodeId: "ns=2;i=20007",
    attributeName: "Value",
  },
  {
    //cycle time
    nodeId: "ns=2;i=20010",
    attributeName: "Value",
  },
  {
    //alarmStatus
    nodeId: "ns=2;i=20080",
    attributeName: "Value",
  },
];

const monitorCycleItem: { nodeId: string; attributeName: string } = {
  nodeId: "ns=2;i=20009",
  attributeName: "Value",
};

const nodesToRead = [
  {
    //serial number
    nodeId: "ns=2;i=20020",
    attributeId: AttributeIds.Value,
  },
  {
    //job name - file stampo
    nodeId: "ns=2;i=20003",
    attributeId: AttributeIds.Value,
  },
  {
    //product - codice articolo
    nodeId: "ns=2;i=20005",
    attributeId: AttributeIds.Value,
  },
  {
    //lot name - codice commessa
    nodeId: "ns=2;i=20022",
    attributeId: AttributeIds.Value,
  },
  {
    //index - codice stampo
    nodeId: "ns=2;i=20037",
    attributeId: AttributeIds.Value,
  },
  {
    //cycle time
    nodeId: "ns=2;i=20010",
    attributeId: AttributeIds.Value,
  },
  {
    //cushion stroke
    nodeId: "ns=2;i=20041",
    attributeId: AttributeIds.Value,
  },
  {
    //dosing time
    nodeId: "ns=2;i=20046",
    attributeId: AttributeIds.Value,
  },
  {
    //injection time
    nodeId: "ns=2;i=20045",
    attributeId: AttributeIds.Value,
  },
];

async function establishConnection(opcuaServer): Promise<void> {
  const client = OPCUAClient.create(options);

  client
    .on("connect", () => {
      console.log(`Client connected to ${opcuaServer.url}`);
    })
    .on("connection_failed", () => {
      console.log(`Client failed to connect to ${opcuaServer.url}.`);
    })
    .on("connection_lost", () => {
      console.log(`Client lost the connection with ${opcuaServer.url}.`);
    })
    .on("start_reconnection", () => {
      console.log(`Client is starting the reconnection process.`);
    })
    .on("reconnection_attempt_has_failed", (_, message) => {
      console.log(`Client reconnection attempt has failed: ${message}`);
    })
    .on("after_reconnection", () => {
      console.log(`Client finished the reconnection process.`);
    })
    .on("backoff", (attemptNumber, delay) => {
      console.log(
        `Client connection retry attempt ${attemptNumber} with ${opcuaServer.url} retrying in ${delay}ms.`
      );
    })
    .on("close", () => {
      console.log(`Client closed and disconnected with ${opcuaServer.url}`);
    })
    .on("timed_out_request", (request) => {
      console.log(`Client request timed out: ${request.toString()}`);
    });
  await client.connect(opcuaServer.url);
  const session = await client.createSession();

  const subscription = ClientSubscription.create(session, {
    requestedPublishingInterval: 1000,
    requestedLifetimeCount: 100,
    requestedMaxKeepAliveCount: 10,
    maxNotificationsPerPublish: 100,
    publishingEnabled: true,
    priority: 10,
  });

  const monitoringParameters: MonitoringParametersOptions = {
    samplingInterval: 1000,
    discardOldest: true,
    queueSize: 10,
  };

  const monitoredItemGroup = ClientMonitoredItemGroup.create(
    subscription,
    monitorStatusItems,
    monitoringParameters,
    TimestampsToReturn.Both
  );

  const monitoredItem = ClientMonitoredItem.create(
    subscription,
    monitorCycleItem,
    monitoringParameters,
    TimestampsToReturn.Both
  );

  monitoredItemGroup.on(
    "changed",
    (monitorStatusItems, dataValue: DataValue) => {
      const nodeId = monitorStatusItems.itemToMonitor.nodeId.toString();
      const value = dataValue.value.value;
      // Update the corresponding property in the data object
      if (nodeId === "ns=2;i=20020") {
        opcuaServer.serNum = value;
      } else if (nodeId === "ns=2;i=20027") {
        opcuaServer.mode = value;
      } else if (nodeId === "ns=2;i=20003") {
        opcuaServer.job = value;
      } else if (nodeId === "ns=2;i=20005") {
        opcuaServer.product = value;
      } else if (nodeId === "ns=2;i=20010") {
        opcuaServer.cycleTime = value;
      } else if (nodeId === "ns=2;i=20012") {
        opcuaServer.goodParts = value;
      } else if (nodeId === "ns=2;i=20022") {
        opcuaServer.lotName = value;
      } else if (nodeId === "ns=2;i=20037") {
        opcuaServer.mouldCode = value;
      } else if (nodeId === "ns=2;i=20006") {
        opcuaServer.norminalParts = value;
      } else if (nodeId === "ns=2;i=20007") {
        opcuaServer.numCavities = value;
      } else if (nodeId === "ns=2;i=20080") {
        opcuaServer.alarmStatus = value;
      }
    }
  );

  monitoredItem.on("changed", async (dataValue: DataValue) => {
    const data = await session.read(nodesToRead);
    opcuaServer.cycleCount = dataValue.value.value;
    opcuaServer.cushionStroke = data[6].value.value;
    opcuaServer.dosingTime = data[7].value.value;
    opcuaServer.injectionTime = data[8].value.value;
    setCycle(
      dataValue.value.value,
      opcuaServer.lotName,
      opcuaServer.product,
      opcuaServer.job,
      opcuaServer.cycleTime,
      opcuaServer.serNum,
      opcuaServer.name,
      opcuaServer.cushionStroke,
      opcuaServer.dosingTime,
      opcuaServer.injectionTime
    );
  });
}

export async function sendJob(data) {
  const client = OPCUAClient.create(options);
  await client.connect(data.url);
  const session = await client.createSession();
  const nodesToWrite = [
    {
      //product - codice articolo
      nodeId: "ns=2;i=20005",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          dataType: DataType.String,
          value: data.product,
        },
      },
    },
    {
      //lot name - codice commessa
      nodeId: "ns=2;i=20022",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          dataType: DataType.String,
          value: data.lotName,
        },
      },
    },
    {
      //index - codice stampo
      nodeId: "ns=2;i=20037",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          dataType: DataType.String,
          value: data.mouldCode,
        },
      },
    },
    {
      //num cavities
      nodeId: "ns=2;i=20007",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          statusCode: StatusCodes.Good,
          dataType: DataType.UInt32,
          value: parseInt(data.numCavities),
        },
      },
    },
    {
      //norminal parts - pezzi commessa
      nodeId: "ns=2;i=20006",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          statusCode: StatusCodes.Good,
          dataType: DataType.UInt32,
          value: parseInt(data.norminalParts),
        },
      },
    },
    {
      //norminal parts - pezzi commessa
      nodeId: "ns=2;i=20039",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          statusCode: StatusCodes.Good,
          dataType: DataType.UInt32,
          value: parseInt(data.expCycTime),
        },
      },
    },
    {
      //ResetJobCounters - Reset produzione
      nodeId: "ns=2;i=20282",
      attributeId: AttributeIds.Value,
      value: {
        value: {
          statusCode: StatusCodes.Good,
          dataType: DataType.Int32,
          value: 1,
        },
      },
    },
  ];
  await session.write(nodesToWrite);
  await console.log(session.read(nodesToRead));
  await session.close();
  await client.disconnect();
}

endpoints.forEach((server) => {
  establishConnection(server).catch((err) => console.error(err));
});
