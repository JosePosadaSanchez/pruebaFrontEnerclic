import React, { useState } from "react";
import categoriesJson from "../../../category/category.json";
import "./form.scss";
import axios from "axios";
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
import { Bar } from "react-chartjs-2";

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
  starDate: "",
  endDate: "",
  timeTrunc: "",
  geoTrunc: "",
  geoLimit: "",
  geoIds: "",
};

const categories = categoriesJson.categories;

export const BasicForm = () => {
  const [search, setSearch] = useState(initialValue);

  const [widges, setWidges] = useState([]);

  const [energia1, setEnergia1] = useState([]);

  const [energia2, setEnergia2] = useState([]);

  const [energia3, setEnergia3] = useState([]);

  const [energia4, setEnergia4] = useState([]);

  const [energia5, setEnergia5] = useState([]);

  const [energia6, setEnergia6] = useState([]);

  const [energia7, setEnergia7] = useState([]);

  const [title1, setTitle1] = useState("");

  const [title2, setTitle2] = useState("");

  const [title3, setTitle3] = useState("");

  const [title4, setTitle4] = useState("");

  const [title5, setTitle5] = useState("");

  const [title6, setTitle6] = useState("");

  const [title7, setTitle7] = useState("");

  const [type, setType] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "noRenovable") {
      setType(1);
    } else if (value === "renovable") {
      setType(0);
    }

    // console.log(filter(categories, value));
    if (name === "category") {
      setWidges(filter(categories, value));
    }

    setSearch({ ...search, [name]: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(search);
    let url = `https://apidatos.ree.es/${search.lang}/datos/${search.category}/${search.widget}?start_date=2022-05-01&end_date=2022-10-31&time_trunc=month`;
    axios
      .get(url)

      .then((res) => {
        setEnergia1(
          res.data.included[type].attributes.content[0].attributes.values
        );

        setEnergia2(
          res.data.included[type].attributes.content[1].attributes.values
        );

        setEnergia3(
          res.data.included[type].attributes.content[2].attributes.values
        );

        setEnergia4(
          res.data.included[type].attributes.content[3].attributes.values
        );
        setEnergia5(
          res.data.included[type].attributes.content[4].attributes.values
        );
        setEnergia6(
          res.data.included[type].attributes.content[5].attributes.values
        );
        setEnergia7(
          res.data.included[type].attributes.content[6].attributes.values
        );

        setTitle1(
          res.data.included[type].attributes.content[0].attributes.title
        );

        setTitle2(
          res.data.included[type].attributes.content[1].attributes.title
        );

        setTitle3(
          res.data.included[type].attributes.content[2].attributes.title
        );
        setTitle4(
          res.data.included[type].attributes.content[3].attributes.title
        );
        setTitle5(
          res.data.included[type].attributes.content[4].attributes.title
        );
        setTitle6(
          res.data.included[type].attributes.content[5].attributes.title
        );
        setTitle7(
          res.data.included[type].attributes.content[6].attributes.title
        );

        // console.log(url);
        // console.log(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = ["Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"];

  const data = {
    labels,
    datasets: [
      {
        label: title1,
        data: labels.map((month, index) => energia1[index]?.value),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: title2,
        data: labels.map((month, index) => energia2[index]?.value),
        backgroundColor: "rgba(1, 98, 194, 0.5)",
      },
      {
        label: title3,
        data: labels.map((month, index) => energia3[index]?.value),
        backgroundColor: "rgba(127, 0, 254, 0.5)",
      },
      {
        label: title4,
        data: labels.map((month, index) => energia4[index]?.value),
        backgroundColor: "rgba(58, 240, 9, 0.5)",
      },
      {
        label: title5,
        data: labels.map((month, index) => energia5[index]?.value),
        backgroundColor: "rgba(1, 143, 255, 0.5)",
      },
      {
        label: title6,
        data: labels.map((month, index) => energia6[index]?.value),
        backgroundColor: "rgba(236, 255, 1, 0.5)",
      },
      {
        label: title7,
        data: labels.map((month, index) => energia7[index]?.value),
        backgroundColor: "rgba(100, 100, 100, 0.5)",
      },
    ],
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
          backgroundColor: "#D7E7F7",
          height: 1000,
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={onFormSubmit}>
            <Box
              sx={{
                my: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" align="center">
                Comparativa de los ultimos 6 meses de 2022
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#017DF8",
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
                labelId="language"
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
                labelId="category"
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
                labelId="widget"
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

            <FormControl>
              <FormLabel id="tipoDeEnergia">Tipo de energia</FormLabel>
              <RadioGroup
                aria-labelledby="energicType"
                defaultValue="renovable"
                name="tipoDeEnergia"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="renovable"
                  control={<Radio />}
                  label="renovable"
                />
                <FormControlLabel
                  value="noRenovable"
                  control={<Radio />}
                  label="No renovalbe"
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
          <Bar options={options} data={data} />
        </Container>
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
