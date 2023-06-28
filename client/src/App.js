import "./App.css";
import * as React from "react";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Styles/theme";
import { MenuAppBar } from "./Components/AppBar/AppBar";
import { SocketContext, socket } from "./Context/socket";
import Machines from "./Pages/Machines";
import Home from "./Pages/Home";
import Production from "./Pages/Production";
import Quality from "./Pages/Quality";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ThemeProvider theme={theme}>
        <MenuAppBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/machines" element={<Machines />} />
          <Route exact path="/production" element={<Production />} />
          <Route exact path="/quality/:id" element={<Quality />} />
        </Routes>
      </ThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
