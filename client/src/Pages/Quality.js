import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/socket";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Quality() {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [machineStatus, setMachineStatus] = useState("");
  const [cycleState, setCycleState] = useState([]);

  socket.on("status", (status) => {
    setMachineStatus(status.find((obj) => obj.name === id));
  });

  socket.on("cycles", (cycles) => {
    setCycleState(cycles);
  });

  const columns = [
    {
      field: "cyclecounter",
      headerName: "N. Ciclo",
      width: 80,
      type: "number",
      headerAlign: "left",
    },
    {
      field: "timestamp",
      headerName: "Data creazione",
      width: 240,
      headerAlign: "left",
    },
    {
      field: "machinename",
      headerName: "Nome pressa",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "sernum",
      headerName: "Matricola",
      width: 100,
      headerAlign: "left",
    },
    {
      field: "lotname",
      headerName: "Codice commessa",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "product",
      headerName: "Codice articolo",
      width: 200,
      headerAlign: "left",
    },
    { field: "job", headerName: "Ricetta", width: 200, headerAlign: "left" },
    {
      field: "cycletime",
      headerName: "Tempo di ciclo reale",
      type: "number",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "cushionstroke",
      headerName: "Quota cuscino",
      type: "number",
      width: 130,
      headerAlign: "left",
    },
    {
      field: "dosingtime",
      headerName: "Tempo di dosaggio",
      type: "number",
      width: 170,
      headerAlign: "left",
    },
    {
      field: "injectiontime",
      headerName: "Tempo di iniezione",
      type: "number",
      width: 170,
      headerAlign: "left",
    },
  ];

  return (
    <Box sx={{ p: 10 }} style={{ height: 400, width: "100%" }}>
      <Typography variant="h4">
        {machineStatus.name}
        <br></br>
      </Typography>
      <Typography variant="subtitle1">
        Matricola: {machineStatus.serNum}
        <br></br>
        Ricetta in uso: {machineStatus.job}
        <br></br>
        Codice articolo: {machineStatus.product}
        <br></br>
        Pezzi prodotti: {machineStatus.goodParts}
        <br></br>
        Contatore cicli: {machineStatus.cycleCount}
        <br></br>
        Quota cuscino: {machineStatus.cushionStroke}
        <br></br>
        Tempo dosaggio: {machineStatus.dosingTime}
        <br></br>
        Tempo iniezione: {machineStatus.injectionTime}
        <br></br>
      </Typography>
      <DataGrid
        rows={cycleState}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        sx={{ width: 5 / 6, marginTop: 2 }}
      />
    </Box>
  );
}

export default Quality;
