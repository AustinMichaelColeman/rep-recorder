export default function DateInput({ value, onChange, name }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="mr-2 text-lg text-light-label dark:text-dark-label"
      >
        Date
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="border rounded p-2"
      />
    </div>
  );
}
