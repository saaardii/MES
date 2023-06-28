import { Box, Typography } from "@mui/material";
import * as React from "react";

function Home() {
  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h1" align="center" sx={{ p: 3 }}>
        Benvenuti in Supervisio 2.0!
      </Typography>
      <Typography variant="h3" align="center" sx={{ p: 4 }}>
        Massimizza l'efficienza e l'eccellenza produttiva con il software
        gestionale per le presse Negri Bossi.
      </Typography>

      <Typography variant="h6" align="left" sx={{ p: 2 }}>
        Il software gestionale per le presse Negri Bossi è progettato per
        offrirti una gestione impeccabile delle tue macchine, mettendo a tua
        disposizione strumenti avanzati e potenti funzionalità. La nostra
        interfaccia intuitiva e user-friendly ti permette di avere un controllo
        totale sulle tue presse; con un semplice click, potrai monitorare le
        prestazioni, apportare regolazioni e ottenere report dettagliati sulla
        produzione.
      </Typography>
    </Box>
  );
}

export default Home;
