import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback
} from "react";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis
} from "recharts";
import companyServise from "../services/companyServise";
import { changesTypes } from "../pages/Company";
import { useAuth } from "../hooks/useAuth";

const PriceChart = ({ uuid, choosenCompany }) => {
  const [data, setData] = useState(null);
  const [dataw, setDataw] = useState([]);
  const { token } = useAuth();

  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [additionalCampaign, setAdditionalCampaign] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    companyServise.getCompanyDetail(uuid).then(company => {
      setData(
        company.prices.map(price => ({
          ...price,
          time: price.created_at,

          [uuid]: price.value
        }))
      );
    });
  }, []);

  useEffect(() => {
    // TODO WebSocketService
    ws.current = new WebSocket(
      `ws://localhost:8000/ws/company/?token=${token}`
    );
    ws.current.onopen = () => {
      setStatus("open connect");
    }; // callback на ивент открытия соединения
    ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения
    gettingData();

    return () => ws.current.close(); //
  }, [token, ws]);
  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      //подписка на получение данных по вебсокету
      const messageData = JSON.parse(e.data);
      setMessage(messageData);
    };
  }, []);
  useMemo(() => {
    // eslint-disable-next-line default-case
    switch (status) {
      case "open connect":
        ws.current.send(
          JSON.stringify({
            pk: uuid,
            action: "join_company",
            request_id: new Date().getTime()
          })
        );
    }
  }, [status, uuid]);
  useEffect(() => {
    let type = choosenCompany?.type;
    // eslint-disable-next-line default-case
    switch (type) {
      case changesTypes.select:
        ws.current.send(
          JSON.stringify({
            pk: choosenCompany.select.id,
            action: "join_company",
            request_id: new Date().getTime()
          })
        );
        setAdditionalCampaign([...additionalCampaign, choosenCompany.select]);
        break;
      case changesTypes.remove:
        ws.current.send(
          JSON.stringify({
            pk: choosenCompany.remove.id,
            action: "remove_company",
            request_id: new Date().getTime()
          })
        );
        setAdditionalCampaign(
          additionalCampaign.filter(
            company => company.id !== choosenCompany.remove.id
          )
        );
        break;
      case changesTypes.clear: // if (x === 'value1')
        // eslint-disable-next-line array-callback-return
        choosenCompany.clear.map(company => {
          ws.current.send(
            JSON.stringify({
              pk: company.id,
              action: "remove_company",
              request_id: new Date().getTime()
            })
          );
        });
        break;
    }
  }, [choosenCompany]);
  useMemo(() => {
    let type = message?.type;
    // eslint-disable-next-line default-case
    switch (type) {
      case "send_new_price": // if (x === 'value1')
        if (message.id === uuid) {
          setData([
            ...data,
            {
              time: message.created_at,
              value: parseInt(message.value),
              [message.id]: parseInt(message.value),
              name: message.created_at
            }
          ]);
        } else {
          let old_data = dataw?.[message.id];
          let new_data = "";
          if (old_data) {
            new_data = [
              ...old_data,
              {
                time: message.created_at,
                value: parseInt(message.value),
                [message.id]: parseInt(message.value),
                name: message.created_at
              }
            ];
          } else {
            new_data = [
              {
                time: message.created_at,
                value: parseInt(message.value),
                [message.id]: parseInt(message.value),
                name: message.created_at
              }
            ];
          }

          setDataw({
            ...dataw,
            [message.id]: [...new_data]
          });
        }
    }
  }, [message]);
  return (
    <>
      {data ? (
        <div
          className="highlight-bar-charts"
          style={{ userSelect: "none", width: "100%" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart width={1000} height={1000} data={data.slice(-50)}>
              <Tooltip />
              <YAxis dataKey={"value"} />
              <XAxis dataKey={"time"} />
              <Line
                legendType={"diamond"}
                activeDot={false}
                animationEasing={"linear"}
                animationDuration={10}
                dot={true}
                isAnimationActive={false}
                dataKey={uuid}
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
          {dataw.length !== 0
            ? additionalCampaign.map(company => (
                // eslint-disable-next-line react/jsx-key
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    width={1000}
                    height={1000}
                    data={dataw[company.id]?.slice(-50)}
                  >
                    <Tooltip />
                    <YAxis dataKey={"value"} />
                    <XAxis dataKey={"time"} />
                    <Line
                      legendType={"diamond"}
                      strokeDasharray="3 4 5 2"
                      activeDot={false}
                      animationEasing={"linear"}
                      animationDuration={10}
                      dot={true}
                      isAnimationActive={false}
                      dataKey={company.id}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ))
            : null}
        </div>
      ) : null}
    </>
  );
};

export default PriceChart;
