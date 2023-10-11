import { useContext, useState } from "react";
import { SocketContext } from "../Context/socket";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function MouldForm() {
  const socket = useContext(SocketContext);
  const [jobsList, setJobsList] = useState([]);

  socket.on("jobs", (jobs) => {
    setJobsList(jobs);
  });

  const columns = [
    {
      field: "id",
      headerName: "N. Commessa",
      width: 120,
      type: "number",
      headerAlign: "left",
    },
    {
      field: "created_at",
      headerName: "Data creazione",
      width: 240,
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
    {
      field: "mouldcode",
      headerName: "Codice Stampo",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "norminalparts",
      headerName: "Pezzi commessa",
      type: "number",
      width: 150,
      headerAlign: "left",
    },
    {
      field: "numcavities",
      headerName: "Numero cavità",
      type: "number",
      width: 150,
      headerAlign: "left",
    },
    {
      field: "exptime",
      headerName: "Tempo di ciclo previsto",
      type: "number",
      width: 200,
      headerAlign: "left",
    },
  ];

  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h4">
        Storico ordini/commesse
        <br></br>
      </Typography>
      <DataGrid
        rows={jobsList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        sx={{ width: 1600, marginTop: 2 }}
      />
    </Box>
  );
}

export default MouldForm;

/*<TableContainer component={Paper}>
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
      </TableContainer>*/
