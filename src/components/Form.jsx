import { useState } from "react";

const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="login"
      />
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <input
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        placeholder="password"
      />
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <button onClick={() => handleClick(email, pass)}>{title}</button>
    </div>
  );
};

export { Form };
