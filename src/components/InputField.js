const InputField = ({ field, label, value, onChange }) => {
    return (
      <div>
        <label>
          {label}: 
          <select
            value={value === null ? "" : value} // receives null from PADUACalculator
            onChange={e => onChange(field, e.target.value === "true")}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>
    );
  };
  
  export default InputField;
  