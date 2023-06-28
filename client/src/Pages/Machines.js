import React, { useState, useContext } from "react";
import { SocketContext } from "../Context/socket";
import MachineItem from "../Components/Machine/MachineItem";
import Grid from "@mui/material/Grid";

function Machines() {
  const [machineStatus, setMachineStatus] = useState(null);
  const socket = useContext(SocketContext);

  socket.on("status", (status) => {
    setMachineStatus(status);
  });

  const horizontalGrid = {
    flexGrow: 1,
    textAlign: "center",
    padding: 80,
  };

  return (
    <div style={horizontalGrid}>
      <Grid container spacing={4}>
        {machineStatus?.map((machine) => (
          <MachineItem
            key={machine.id}
            name={machine.name}
            serNum={machine.serNum}
            mode={machine.mode}
            job={machine.job}
            lotName={machine.lotName}
            alarmStatus={machine.alarmStatus}
          />
        ))}
      </Grid>
    </div>
  );
}

export default Machines;
