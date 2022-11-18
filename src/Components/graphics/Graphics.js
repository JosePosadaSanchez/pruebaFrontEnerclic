import React from "react";
import { Bar } from "react-chartjs-2";
import { getDay, getMonth, getYear } from "../../utils/getMonth";
import { ramdomColor } from "../../utils/ramdomColor";
export const Graphics = ({ e, type, search }) => {
  let title = "";
  if (type === 1) {
    title = e.type;
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  let labels = [];
  if (type === 1 && search.timeTrunc == "month") {
    labels = e.attributes.content[0].attributes.values.map((e) =>
      getMonth(e.datetime)
    );
  } else if (type === 1 && search.timeTrunc == "day") {
    labels = e.attributes.content[0].attributes.values.map((e) =>
      getDay(e.datetime)
    );
  } else if (type === 1 && search.timeTrunc == "year") {
    labels = e.attributes.content[0].attributes.values.map((e) =>
      getYear(e.datetime)
    );
  } else if (type === 2 && search.timeTrunc == "day") {
    labels = e.attributes.values.map((e) => getDay(e.datetime));
  } else if (type === 2 && search.timeTrunc == "month") {
    labels = e.attributes.values.map((e) => getMonth(e.datetime));
  } else if (type === 2 && search.timeTrunc == "year") {
    labels = e.attributes.values.map((e) => getYear(e.datetime));
  }

  let superdato = {};
  let prueba = [];
  if (type === 1) {
    superdato = e.attributes.content.map((e) => e.attributes);
    prueba = superdato.map((e, index) => {
      return {
        label: superdato[index].title,
        data: e.values.map((e) => e.value),
        backgroundColor: ramdomColor(),
      };
    });
  }
  if (type === 2) {
    prueba = [
      {
        label: e.attributes.title,
        data: e.attributes.values.map((e) => e.value),
        backgroundColor: ramdomColor(),
      },
    ];
  }

  const data = {
    labels,
    datasets: prueba,
  };

  return <Bar options={options} data={data} />;
};
