import React from "react";
import styles from "./NumericControl.module.css";

export default function NumericControl({ label, value, name, step, onChange }) {
  const handleLabelClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      event.preventDefault();
    }
  };

  const handleIncrement = () => {
    onChange({ target: { name, value: value + step } });
  };

  const handleDecrement = () => {
    onChange({ target: { name, value: value - step } });
  };

  return (
    <label
      className={styles.label}
      onClick={(event) => handleLabelClick(event)}
    >
      {label}:
      <div className={styles.inputControl}>
        <button
          type="button"
          onClick={handleDecrement}
          className={styles.incrementButton}
        >
          -
        </button>
        <input
          type="number"
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          className={styles.input}
          required
          min="1"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className={styles.incrementButton}
        >
          +
        </button>
      </div>
    </label>
  );
}
