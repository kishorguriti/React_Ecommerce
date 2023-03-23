import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DataGrid } from "@mui/x-data-grid";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./sample.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Sample() {
  const [value, setValue] = React.useState(0);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="warning">
          <Stack direction="row" spacing={3} height={60} paddingTop={2}>
            <Avatar
              alt="Remy Sharp"
              className="ms-auto"
              src="https://img.mensxp.com/media/content/2022/Jan/19_61deb81182673.jpeg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://img.theweek.in/content/dam/week/gallery/shots/2022/may-01-2022/people/73-Ram-Charan.jpg"
            />
            <Avatar
              alt="Cindy Baker"
              className="me-1"
              src="https://superstarsbio.com/wp-content/uploads/2019/02/prabhas-3.jpg"
            />
            <Badge badgeContent={4} color="error" className="me-4 mt-2">
              <MailIcon color="primary" />
            </Badge>
          </Stack>
        </AppBar>
      </Box>

      <Box sx={{ mx: 6, mt: 6, display: "flex", flexDirection: "row" }}>
        <Card sx={{ maxWidth: 345, mx: 6 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="https://staticimg.amarujala.com/assets/images/2022/01/30/750x506/jr-ntr-lifestyle_1643520884.jpeg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Jr NTR
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Jr NTR 27 December 1985 is an Indian actor, film producer, and
              television personality who works predominantly in Telugu films. In
              a film career spanning over thirty five years, Starred In RRR
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, mx: 6 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="https://static.toiimg.com/photo/87064706.cms"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Ram Charan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ram Charan 27 December 1985 is an Indian actor, film producer, who
              works predominantly in Telugu films. In a film career spanning
              over thirty five years, Starred In RRR
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, mx: 6 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="https://cdn.tollywood.net/wp-content/uploads/2022/12/Prabhas-takes-heavy-bank-loan-on-his-Properties-Whats-the-reason-jpg.webp"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              prabash
            </Typography>
            <Typography variant="body2" color="text.secondary">
              prabash born 17 December 1987 is an Indian actor and film producer
              who works in Telugu films. Known for his stoic action hero
              persona, he has won a National Film Award for Bahubali.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Container className="d-flex justify-content-center mt-5 ">
        <Stack spacing={2} direction="row">
          <Button variant="contained">NTR</Button>
          <Button variant="contained">Charan</Button>
          <Button variant="contained">Prabash</Button>
        </Stack>
      </Container>
      <Container className="mx-6">
        <div style={{ height: 400, width: "100%", marginTop: 24 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Container>

      <Container className="mt-5">
        <div>
          <Typography>
            CheckBox
            <Checkbox {...label} defaultChecked />
          </Typography>
        </div>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              className="ms-5"
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              className="ms-5"
              value="male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              className="ms-5"
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
      </Container>

      <Box sx={{ minWidth: 920, mt: 5, ml: 5 }} className="custom-class">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default Sample;
