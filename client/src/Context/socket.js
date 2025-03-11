import * as React from "react";
import socketio from "socket.io-client";
const ENDPOINT = "http://172.17.185.137:4000";

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();
