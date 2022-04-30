import React from 'react';

import * as Style from '../../style/table.module.css';

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
      <td>{props.item.acciones[0]?.Fecha}</td>
      <td className={Style.tooltip}>
        <div className={Style.text}>{props.item.acciones[0]?.Actividad}</div>
        <span className={Style.tooltiptext}>{props.item.acciones[0]?.Actividad}</span>
      </td>
      <td>{props.item?.MONEDA}</td>
      <td>{props.item?.['props.ITEM PRESUPUESTARIO']}</td>
      <td>{props.item?.CONTRALORIA}</td>
      <td>{props.item?.PAC}</td>
      <td>{props.item?.RESPONSABLE}</td>
    </tr>
  );
};

export default TableBox;
