import { useState } from "react";

const ColorPalette = () => {
  const [value, setValue] = useState(1);
  let array = new Array(value).fill(null).map((d, i) => i + 1);
  const handleChange = (e) => {
    setValue(e.target.value >= 1 ? +e.target.value : 1);
  };
  const color = (value) => {
    const length = array.length;
    console.log("color:", (100 / length) * value);
    return (100 / length) * value;
  };

  return (
    <div className="container">
      <h2>Color Palette</h2>
      <input type="number" value={value} onChange={handleChange}></input>
      <div className="colorPaletteContainer">
        {array.map((item, index) => (
          <span
            key={index}
            className="colorPalette"
            style={{ background: `rgb(255 0 0 /${color(item)}%)` }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
