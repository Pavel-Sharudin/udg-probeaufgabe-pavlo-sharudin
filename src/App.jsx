import { useState } from "react";
import "./App.css";
import Papa from "papaparse";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(50);
  const [genderCounts, setGenderCounts] = useState([
    { name: "Herren", value: 0 },
    { name: "Kinder", value: 0 },
    { name: "Damen", value: 0 },
  ]);

  // Upload CSV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        updatePieChart(results.data);
      },
    });
  };

  // Chart diagramm
  const updatePieChart = (parsedData) => {
    let HerrenValue = 0;
    let KinderValue = 0;
    let DamenValue = 0;

    parsedData.forEach((row) => {
      if (row.Geschlecht === "Herren") HerrenValue++;
      else if (row.Geschlecht === "Kinder") KinderValue++;
      else if (row.Geschlecht === "Damen") DamenValue++;
    });

    setGenderCounts([
      { name: "Herren", value: HerrenValue },
      { name: "Kinder", value: KinderValue },
      { name: "Damen", value: DamenValue },
    ]);
  };

  // Updating
  const inputChangedHandler = (e, index) => {
    const { name, value } = e.target;

    setData((prevRows) => {
      const updatedRow = { ...prevRows[index], [name]: value };
      const updatedData = [
        ...prevRows.slice(0, index),
        updatedRow,
        ...prevRows.slice(index + 1),
      ];
      updatePieChart(updatedData);
      return updatedData;
    });
  };

  // save CSV
  const handleFileSave = () => {
    const csvString = Papa.unparse(data);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table.csv");
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="App">
      <div className="title-bar">
        <h2>Bitte laden Sie eine CSV-Datei hoch</h2>
      </div>
      <div className="instrument-bar">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button className="button" onClick={handleFileSave}>Herunterladen neu CSV</button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={genderCounts}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {data.length > 0 && (
        <div className="table-wrapper">
          <div className="table-title">
            <span>Hauptartikelnr</span>
            <span>Artikelname</span>
            <span>Hersteller</span>
            <span>Beschreibung</span>
            <span>Materialangaben</span>
            <span>Geschlecht</span>
            <span>Produktart</span>
            <span>Ärmel</span>
            <span>Bein</span>
            <span>Kragen</span>
            <span>Herstellung</span>
            <span>Taschenart</span>
            <span>Grammatur</span>
            <span>Material</span>
            <span>Ursprungsland</span>
            <span>Bildname</span>
          </div>
          {data.slice(0, visibleRows).map((row, index) => (
                <div className='table-row' key={index}>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Hauptartikelnr" type='text' className='table-child' value={row.Hauptartikelnr}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Artikelname" type='text' className='table-child' value={row.Artikelname}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Hersteller" type='text' className='table-child' value={row.Hersteller}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Beschreibung" type='text' className='table-child' value={row.Beschreibung}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Materialangaben" type='text' className='table-child' value={row.Materialangaben}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Geschlecht" type='text' className='table-child' value={row.Geschlecht}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Produktart" type='text' className='table-child' value={row.Produktart}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Ärmel" type='text' className='table-child' value={row.Ärmel}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Bein" type='text' className='table-child' value={row.Bein}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Kragen" type='text' className='table-child' value={row.Kragen}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Herstellung" type='text' className='table-child' value={row.Herstellung}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Taschenart" type='text' className='table-child' value={row.Taschenart}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Grammatur" type='text' className='table-child' value={row.Grammatur}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Material" type='text' className='table-child' value={row.Material}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Ursprungsland" type='text' className='table-child' value={row.Ursprungsland}></input>
                  <input onChange={(e) => inputChangedHandler(e, index)} name="Bildname" type='text' className='table-child' value={row.Bildname}></input>
                </div>
              ))}
          <button className="button" onClick={() => setVisibleRows((prev) => prev + 50)}>mehr anzeigen</button>
        </div>
      )}
    </div>
  );
}

export default App;
