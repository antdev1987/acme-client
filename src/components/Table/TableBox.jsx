import React from 'react';

const TableBox = (props) => {
  return (
    <tr>
      <td>{props.item['N° CASO']}</td>
      <td>{props.item.AÑO}</td>
      <td>{props.item.ID}</td>
      <td>{props.item.NOMBRE}</td>
      <td>{props.item?.['UNIDAD REQUIRENTE']}</td>
      <td>{props.item.CANTIDAD}</td>
      <td>{props.item?.['TIPO LICITACION']}</td>
      <td>{props.item.ESTADO}</td>
      <td>{props.item.SUBESTADO}</td>
      <td>{props.item?.MONEDA}</td>
      <td>{props.item?.['props.ITEM PRESUPUESTARIO']}</td>
    </tr>
  );
};

export default TableBox;
