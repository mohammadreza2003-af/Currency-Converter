import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [cur, setCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [value, setValue] = useState("");
  const [curValue, setCurValue] = useState("");
  const [load, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${cur}&to=${toCur}`
        );
        const data = await res.json();
        if (!data.amount) return;
        setCurValue(data.rates[toCur]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [value, cur, toCur, load]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    /^\d*$/.test(inputValue) && setValue(inputValue);
  };

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e)}
        placeholder="Enter amount"
      />
      <div className="select-container">
        <select value={cur} onChange={(e) => setCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <span>to</span>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>
        {value !== ""
          ? !load
            ? value > 0 &&
              (cur === toCur
                ? "Not Currect"
                : `${value} ${cur} = ${curValue} ${toCur}`)
            : "Loading..."
          : ""}
      </p>
    </div>
  );
}

export default App;
