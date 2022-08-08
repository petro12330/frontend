import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import companyServise from "../services/companyServise";
import PriceChart from "../components/PriceChart";
import Select from "react-select";

export const changesTypes = {
  remove: "remove",
  select: "select",
  clear: "clear"
};

const CompanyPage = () => {
  const { uuid } = useParams();
  const [companyOptions, setCompanyOptions] = useState([]);
  const [choosenCompany, setChoosenCompany] = useState([]);

  useEffect(() => {
    const getCompanyList = async () => {
      let res = await companyServise.getCompanyList();
      res = res.filter(el => el.id !== uuid);
      setCompanyOptions(
        res.map(el => ({ ...el, value: el.id, label: el.name }))
      );
    };
    getCompanyList();
  }, [setCompanyOptions]);
  const handleChange = (value, actionMeta) => {
    let changes = {};
    // eslint-disable-next-line default-case
    switch (actionMeta.action) {
      case "remove-value":
        changes.type = changesTypes.remove;
        changes.remove = actionMeta.removedValue;
        break;
      case "select-option":
        changes.type = changesTypes.select;
        changes.select = actionMeta.option;
        break;
      case "clear":
        changes.type = changesTypes.clear;
        changes.clear = actionMeta.removedValues;
        break;
    }
    setChoosenCompany(changes);
  };
  return (
    <>
      <h1>Company</h1>
      <Link to={`/`}>К списку компаний</Link>
      <PriceChart uuid={uuid} choosenCompany={choosenCompany} />
      <Select
        isClearable
        isMulti
        options={companyOptions}
        onChange={handleChange}
      />
    </>
  );
};

export default CompanyPage;
