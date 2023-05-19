export default function DateInput({ value, onChange }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="date"
        className="mr-2 text-lg text-light-label dark:text-dark-label"
      >
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={value}
        onChange={onChange}
        required
        className="border rounded p-2"
      />
    </div>
  );
}
