import React, { useState } from "react";
import categoriesJson from "../../../category/category.json";
import "./form.scss";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { filter } from "../../../utils/filterCategories/filter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getData } from "../../../helpers/getDataHelper";
import { getResType } from "../../../utils/getResType";
import { getDay, getMonth, getYear } from "../../../utils/getMonth";
import { Graphics } from "../../graphics/Graphics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialValue = {
  lang: "",
  category: "",
  widget: "",
  startDate: "2022/11/01",
  endDate: "2022/11/15",
  timeTrunc: "day",
  geoTrunc: "",
  geoLimit: "",
  geoIds: "",
};

const categories = categoriesJson.categories;

export const BasicForm = () => {
  const [search, setSearch] = useState(initialValue);

  const [widges, setWidges] = useState([]);

  const [type, setType] = useState(0);

  const [value, setValue] = useState({ typeResp: "", data: [] });

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "noRenovable") {
      setType(1);
    } else if (value === "renovable") {
      setType(0);
    }

    if (name === "category") {
      setWidges(filter(categories, value));
    }

    setSearch({ ...search, [name]: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let url = `https://apidatos.ree.es/${search.lang}/datos/${search.category}/${search.widget}?start_date=${search.startDate}T00:00&end_date=${search.endDate}T23:59&time_trunc=${search.timeTrunc}`;

    const getValues = async () => {
      const response = await getData(url);
      if (response.status === 200) {
        const typeResp = getResType(response.data);
        if (typeResp === 1) {
          setValue({ type: 1, data: response.data.included });
        } else if (typeResp === 2) {
          setValue({ type: 2, data: response.data.included });
        } else {
          setValue({ type: 0, data: [] });
        }
      } else {
        setError(response.response.data.errors[0].detail);
        // alert(response.response.data.errors[0].detail);
        Swal.fire({
          showConfirmButton: true,
          icon: "error",
          text: response.response.data.errors[0].detail,
        });
      }
    };

    getValues();
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          background: "linear-gradient(to bottom, pink, white);",
        }}
      >
        <Container maxWidth="xs">
          <form onSubmit={onFormSubmit}>
            <Box
              sx={{
                my: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" align="center">
                Gráficos comparativos de la red eléctrica
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "pink",
                my: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" align="center">
                Formulario
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="language">Idioma</InputLabel>
              <Select
                name="lang"
                id="language"
                value={search.lang}
                label="language"
                onChange={handleChange}
              >
                <MenuItem value={"es"}>Español</MenuItem>
                <MenuItem value={"en"}>Ingles</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="category">Categoria</InputLabel>
              <Select
                name="category"
                id="category"
                value={search.category}
                label="category"
                onChange={handleChange}
              >
                {categories.map((elem, index) => {
                  return (
                    <MenuItem key={index} value={elem.name}>
                      {elem.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="widget">Widget</InputLabel>
              <Select
                name="widget"
                id="widget"
                value={search.widget}
                label="widget"
                onChange={handleChange}
              >
                {widges.map((elem, index) => {
                  return (
                    <MenuItem key={index} value={elem.name}>
                      {elem.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                name="startDate"
                id="startDate"
                label="Fecha de inicio"
                type="date"
                onChange={handleChange}
                value={search.startDate}
              ></TextField>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                name="endDate"
                id="endDate"
                label="Fecha final"
                type="date"
                value={search.endDate}
                onChange={handleChange}
              ></TextField>
            </FormControl>

            <FormControl>
              <FormLabel id="time_trunc">Medición de tiempo</FormLabel>
              <RadioGroup
                aria-labelledby="time_trunc"
                defaultValue="day"
                name="timeTrunc"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="day"
                  control={<Radio />}
                  label="Días"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="Meses"
                />
                <FormControlLabel
                  value="year"
                  control={<Radio />}
                  label="Años"
                />
              </RadioGroup>
            </FormControl>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                Ejecutar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <Box
        backgroundColor="#D7E7F7"
        display="flex"
        justifyContent="center"
        marginRight="auto"
        marginLeft="auto"
        marginTop="1%"
        flexDirection="column"
        alignItems="center"
        width="75%"
      >
        {value.data.map((e) => (
          <Graphics e={e} type={value.type} search={search} />
        ))}
      </Box>

      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "50%",
        }}
      ></Box>
    </>
  );
};
