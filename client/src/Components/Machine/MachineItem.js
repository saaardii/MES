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
        }
        break;
      case 2:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("greenyellow");
          setIcon("semi-automatic.png");
        }
        break;
      case 3:
        const interval = setInterval(() => {
          if (props.alarmStatus) {
            setColor("red");
            setIcon("alarm.png");
          }

          setIcon("manual.png");
          return () => clearInterval(interval);
        }, 3000);
        break;
      case 4:
        if (props.alarmStatus) {
          setColor("red");
          setIcon("alarm.png");
        } else {
          setColor("yellow");
          setIcon("setup.png");
        }
        break;
    }
  }, []);

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
            display="flex"
            align="center"
            component="img"
            src={icon}
            alt=""
            sx={{
              width: icon == "manual.png" || icon == "setup.png" ? 100 : 130,
            }}
          />
          <CardContent>
            <Typography align="left">
              <strong>Codice commessa: </strong>
              <br></br>
              {props.lotName}
            </Typography>
            <Typography align="left">
              <strong>Ricetta stampo: </strong>
              <br></br>
              {props.job}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default MachineItem;
