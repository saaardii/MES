import { useContext, useState } from "react";
import { SocketContext } from "../Context/socket";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MouldForm() {
  const socket = useContext(SocketContext);
  const [jobs, setJobs] = useState(null);

  socket.on("jobs", (jobs) => {
    setJobs(jobs);
  });

  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h4">
        Storico ordini/commesse
        <br></br>
      </Typography>
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
