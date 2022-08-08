import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import companyServise from "../services/companyServise";

const TableCompany = () => {
  const [compnayList, setCompnayList] = useState([]);
  useEffect(() => {
    console.log(compnayList);
    if (!!compnayList) {
      companyServise.getCompanyList().then(data => setCompnayList(data));
    }
  }, [setCompnayList]);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">created_at</th>
          <th scope="col">last_price</th>
        </tr>
      </thead>
      <tbody>
        {compnayList.map(el => (
          // eslint-disable-next-line react/jsx-key
          <tr>
            <th scope="row">{el.id}</th>
            <th scope="row">
              {<Link to={`/company/${el.id}`}>{el.name}</Link>}
            </th>
            <td>{el.created_at}</td>
            <td>{el.last_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableCompany };
