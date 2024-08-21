const BaseInput = ({
  type,
  name,
  placeholder,
  value,
  mulValues,
  onChange,
  addCategory,
  removeCategory,
  required = false,
  pattern = null,
  title = "",
  catOptions = null,
  ...props
}) => {
  return (
    <div className="flex flex-col w-fit mx-3 flex-grow">
      <label
        htmlFor={`form-${name}`}
        className="text-sm font-medium leading-6 text-buff"
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
        {!required && <i> (optional)</i>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={`form-${name}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          title={title}
          pattern={pattern}
          required={required}
          className="border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md"
        />
      ) : type === "tags" ? (
        <div>
          <input
            type="text"
            name={name}
            id={`form-${name}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={(e) => e.key === "Enter" && addCategory()}
            title={title}
            {...props}
            className="border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md"
          />
          <datalist id={`form-datalist-${name}`}>
            {catOptions?.map((cat) => (
              <option key={cat._id} value={cat.name} />
            ))}
          </datalist>
          <br />
          {mulValues?.map((val, index) => (
            <span
              className="text-buff px-3 py-1.5 border border-buff rounded-md mr-2"
              key={index}
            >
              {val}
              <span onClick={() => removeCategory(index)}>✖</span>
            </span>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={`form-${name}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          title={title}
          pattern={pattern}
          required={required}
          {...props}
          className="border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md"
        />
      )}
    </div>
  );
};

export default BaseInput;
