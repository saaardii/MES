import { useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/socket";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Quality() {
  const { id } = useParams();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [machineStatus, setMachineStatus] = useState("");
  const [cycleState, setCycleState] = useState([]);
  const [machineMode, setMachineMode] = useState(null);
  const [open, openchange] = useState(false);

  const productRef = useRef();
  const lotNameRef = useRef();
  const mouldCodeRef = useRef();
  const numCavitiesRef = useRef();
  const norminalPartsRef = useRef();
  const expCycTimeRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    var productInput = productRef.current.value;
    var lotNameInput = lotNameRef.current.value;
    var mouldCodeInput = mouldCodeRef.current.value;
    var numCavitiesInput = numCavitiesRef.current.value;
    var norminalPartsInput = norminalPartsRef.current.value;
    var expCycTimeInput = expCycTimeRef.current.value;

    const DATA = {
      url: machineStatus.url,
      serNum: machineStatus.serNum,
      name: machineStatus.name,
      product: productInput,
      lotName: lotNameInput,
      mouldCode: mouldCodeInput,
      numCavities: numCavitiesInput,
      norminalParts: norminalPartsInput,
      expCycTime: expCycTimeInput,
    };

    socket.emit("new job", DATA);
    productRef.current.value = "";
    lotNameRef.current.value = "";
    mouldCodeRef.current.value = "";
    numCavitiesRef.current.value = "";
    norminalPartsRef.current.value = "";
    expCycTimeRef.current.value = "";
    navigate(`/production`);
  }

  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  socket.on("status", (status) => {
    setMachineStatus(status.find((obj) => obj.name === id));
    switch (machineStatus.mode) {
      case 1:
        setMachineMode("Automatico");
      case 2:
        setMachineMode("Semi-automatico");
      case 3:
        setMachineMode("Manutenzione");
      case 4:
        setMachineMode("Manuale");
    }
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
      headerName: "Tempo di ciclo reale (s)",
      type: "number",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "cushionstroke",
      headerName: "Quota cuscino (mm)",
      type: "number",
      width: 180,
      headerAlign: "left",
    },
    {
      field: "dosingtime",
      headerName: "Tempo di dosaggio (s)",
      type: "number",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "injectiontime",
      headerName: "Tempo di iniezione (s)",
      type: "number",
      width: 200,
      headerAlign: "left",
    },
  ];

  return (
    <Box sx={{ p: 10 }}>
      <Grid container direction="column" rowGap={1}>
        <Grid item>
          <Typography variant="h4">
            {machineStatus.name}
            <br></br>
          </Typography>
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1">
              Nome pressa: {machineStatus.name}
              <br></br>
              Ricetta in uso: {machineStatus.job}
              <br></br>
              Modalità: {machineMode}
              <br></br>
              Codice commessa: {machineStatus.lotName}
              <br></br>
              Codice articolo: {machineStatus.product}
              <br></br>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Pezzi prodotti: {machineStatus.goodParts}
              <br></br>
              Tempo ciclo: {machineStatus.cycleTime / 1000} s<br></br>
              Quota cuscino: {machineStatus.cushionStroke / 10000} mm
              <br></br>
              Tempo dosaggio: {machineStatus.dosingTime / 1000} s<br></br>
              Tempo iniezione: {machineStatus.injectionTime / 1000} s<br></br>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={functionopenpopup}
            disabled={machineStatus.mode == 1 || machineStatus.mode == 2}
            type="submit"
            variant="contained"
          >
            Nuova commessa
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            Storico cicli
            <br></br>
          </Typography>
        </Grid>
        <Grid item>
          <DataGrid
            rows={cycleState}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
              filter: {
                filterModel: {
                  items: [{ field: "machinename", value: id }],
                },
              },
              sorting: {
                sortModel: [{ field: "timestamp", sort: "desc" }],
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            sx={{ width: 5 / 6, marginTop: 2 }}
          />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Invio nuovo ordine/commessa
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={submitHandler}
            justifyContent="center"
            display="flex"
            flexDirection="column"
          >
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Codice commessa"
                id="lotName"
                inputRef={lotNameRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Codice articolo"
                id="product"
                inputRef={productRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Codice stampo"
                id="mouldCode"
                inputRef={mouldCodeRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Pezzi da produrre"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                id="norminalParts"
                inputRef={norminalPartsRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Cavità stampo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                id="numCavities"
                inputRef={numCavitiesRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Tempo di ciclo (previsto)"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                id="expCycTime"
                inputRef={expCycTimeRef}
              />
            </FormControl>
            <FormControl sx={{ m: 1, mt: 3 }}>
              <Button fullWidth type="submit" variant="contained">
                Aggiungi commessa
              </Button>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Quality;
