function EditableField({
  label,
  name,
  value,
  editMode,
  onChange,
  type,
  options = [],
}) {
  const isNumberField = ["age", "height", "weight"].includes(name);

  return (
    <div className="bg-gray-200 rounded-xl px-4 py-2 select-none ">
      <p className="text-s text-gray-500">{label}</p>

      {editMode ? (
        type === "select" ? (
          <select
            name={name}
            value={value ?? ""}
            onChange={onChange}
            className="w-full bg-gray-100 p-3 rounded-md outline-none"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={isNumberField ? "number" : "text"}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            className="w-full bg-gray-100 p-3 rounded-md outline-none"
          />
        )
      ) : (
        <p className="font-medium">{value || "-"}</p>
      )}
    </div>
  );
}

export default EditableField;
