export const joinCompany = (ws, uuid) => {
  if (!ws.current) return;
  ws.current.send(
    JSON.stringify({
      pk: uuid,
      action: "join_company",
      request_id: new Date().getTime()
    })
  );
};

export const removeCompany = (ws, uuid) => {
  ws.current.send(
    JSON.stringify({
      pk: uuid,
      action: "remove_company",
      request_id: new Date().getTime()
    })
  );
};

export const removeManyCompany = (ws, companyList) => {
  companyList.map();
};
