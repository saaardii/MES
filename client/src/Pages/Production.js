import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { SocketContext } from "../Context/socket";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function MouldForm() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [machineName, setMachineName] = useState("");
  const [machineStatus, setMachineStatus] = useState(null);
  const [jobs, setJobs] = useState(null);

  const handleChange = (event) => {
    setMachineName(event.target.value);
  };

  socket.on("status", (status) => {
    setMachineStatus(status);
  });

  socket.on("jobs", (jobs) => {
    setJobs(jobs);
  });

  const nameRef = useRef();
  const productRef = useRef();
  const lotNameRef = useRef();
  const mouldCodeRef = useRef();
  const numCavitiesRef = useRef();
  const norminalPartsRef = useRef();
  const expCycTimeRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    var nameRefInput = nameRef.current.value;
    var productInput = productRef.current.value;
    var lotNameInput = lotNameRef.current.value;
    var mouldCodeInput = mouldCodeRef.current.value;
    var numCavitiesInput = numCavitiesRef.current.value;
    var norminalPartsInput = norminalPartsRef.current.value;
    var expCycTimeInput = expCycTimeRef.current.value;

    const machine = machineStatus.find((obj) => obj.name === nameRefInput);
    const DATA = {
      url: machine.url,
      serNum: machine.serNum,
      name: nameRefInput,
      product: productInput,
      lotName: lotNameInput,
      mouldCode: mouldCodeInput,
      numCavities: numCavitiesInput,
      norminalParts: norminalPartsInput,
      expCycTime: expCycTimeInput,
    };

    socket.emit("new job", DATA);
    nameRef.current.value = "";
    productRef.current.value = "";
    lotNameRef.current.value = "";
    mouldCodeRef.current.value = "";
    numCavitiesRef.current.value = "";
    norminalPartsRef.current.value = "";
    expCycTimeRef.current.value = "";
    navigate("/production");
  }

  return (
    <Box sx={{ p: 10 }}>
      <Box component="form" onSubmit={submitHandler}>
        <FormControl required sx={{ m: 1, width: 300, mt: 3 }}>
          <InputLabel id="select-mould-label">Pressa</InputLabel>
          <Select
            labelId="select-mould-label"
            label="Pressa"
            value={machineName}
            onChange={handleChange}
            inputRef={nameRef}
          >
            {machineStatus?.map((machine) => (
              <MenuItem key={machine.name} value={machine.name}>
                <ListItemText primary={machine.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Codice commessa"
            id="lotName"
            inputRef={lotNameRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Codice articolo"
            id="product"
            inputRef={productRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Codice stampo"
            id="mouldCode"
            inputRef={mouldCodeRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Pezzi da produrre"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            id="norminalParts"
            inputRef={norminalPartsRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Cavità stampo"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            id="numCavities"
            inputRef={numCavitiesRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            required
            label="Tempo di ciclo (previsto)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            id="expCycTime"
            inputRef={expCycTimeRef}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Button type="submit" variant="contained">
            Aggiungi commessa
          </Button>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>N. Commessa</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Data creazione</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Matricola</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Codice commessa</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Codice articolo</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Codice stampo</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Pezzi commessa</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Numero cavità</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Tempo di ciclo previsto</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.sernum}</TableCell>
                <TableCell align="right">{row.lotname}</TableCell>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.mouldcode}</TableCell>
                <TableCell align="right">{row.norminalparts}</TableCell>
                <TableCell align="right">{row.numcavities}</TableCell>
                <TableCell align="right">{row.exptime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MouldForm;
