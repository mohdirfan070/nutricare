function EditableField({ label, name, value, editMode, onChange }) {
  const isNumberField = ["age", "height", "weight"].includes(name);

  return (
    <div className="bg-[#F4F4F4] rounded-xl px-4 py-2">
      <p className="text-s text-gray-500">{label}</p>

      {editMode ? (
        <input
          type={isNumberField ? "number" : "text"}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className="w-full bg-white mt-1 px-2 py-1 rounded-md outline-none"
        />
      ) : (
        <p className="font-medium">{value || "-"}</p>
      )}
    </div>
  );
}

export default EditableField;
