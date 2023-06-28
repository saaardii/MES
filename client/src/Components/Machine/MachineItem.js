import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";

function MachineItem(props) {
  const [color, setColor] = React.useState();
  const [icon, setIcon] = React.useState();

  React.useLayoutEffect(() => {
    switch (props.mode) {
      case 1:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("greenyellow");
          setIcon("automatic.png");
          // cambia icona modalità auto
        }
        break;
      case 2:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("greenyellow");
          setIcon("semi-automatic.png");
          // cambia icona modalità semi
        }
        break;
      case 3:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("yellow");
          setIcon("manual.png");
          // cambia icona modalità manual
        }
        break;
      case 4:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("yellow");
          setIcon("setup.png");
          // cambia icona modalità setup
        }
        break;
    }
  }, [props]);

  return (
    <Grid item>
      <Card
        align="center"
        sx={{
          maxWidth: 345,
          backgroundColor: color,
        }}
      >
        <CardActionArea component={RouterLink} to={`/quality/${props.name}`}>
          <CardHeader title={props.name} />
          <CardMedia
            align="center"
            component="img"
            height="194"
            image={"NovaeT.png"}
            alt=""
            sx={{
              width: 350,
              height: 120,
            }}
          />
          <CardMedia
            align="center"
            component="img"
            src={icon}
            alt=""
            sx={{
              width: 80,
              height: 80,
            }}
          />
          <CardContent>
            <Typography align="left">Matricola: {props.serNum}</Typography>
            <Typography align="left">
              Codice commessa: {props.lotName}
            </Typography>
            <Typography align="left">Ricetta stampo: {props.job}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default MachineItem;
