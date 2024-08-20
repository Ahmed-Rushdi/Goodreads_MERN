const BaseInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  pattern = null,
  title = "",
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
