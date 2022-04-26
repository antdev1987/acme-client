import React from "react";

//import * as XLSX from 'xlsx/xlsx.mjs';
import * as XLSX from "xlsx";
import axios from "axios";

const Mantencion = () => {
  const handleFile = async (e) => {
    // console.log(e.target.files[0])

    const file = e.target.files[0];

    if (!file) {
      console.log("aqui");
      return;
    }

    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data, { cellDates: true });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_row_object_array(worksheet);
    console.log(jsonData);
    // console.log(jsonData[10].ID_CASOS);
    // console.log(
    //   jsonData[10]["LLEGADA A COMPRAS"]
    //     .toISOString()
    //     .split(":")[0]
    //     .split("T06")[0]
    // );

    try {
      const urr = "http://192.168.100.7:4000/api/admin/mantencion";

      const datas = await fetch(urr, {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await datas.json();

      console.log("datas", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Parse Excel</h1>

      <input type="file" onChange={(e) => handleFile(e)} />
    </div>
  );
};

export default Mantencion;
