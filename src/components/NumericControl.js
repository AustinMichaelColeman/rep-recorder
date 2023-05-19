import React from "react";

export default function NumericControl({ label, value, name, step, onChange }) {
  const handleIncrement = () => {
    onChange({ target: { name, value: value + step } });
  };

  const handleDecrement = () => {
    onChange({ target: { name, value: value - step < 0 ? 0 : value - step } });
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mr-2 text-light-heading dark:text-dark-heading"
      >
        {label}
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-10 h-10 bg-red-500 text-white dark:bg-red-600 dark:text-white"
        >
          -
        </button>
        <input
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          required
          className="py-2  text-center w-full"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="w-10 h-10 bg-green-500 text-white dark:bg-green-600 dark:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
