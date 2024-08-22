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
  listOptions = null,
  className,
  containerClass,
  ...props
}) => {
  return (
    <div className={`flex flex-col w-fit mx-3 flex-grow ${containerClass}`}>
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
          className={`border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md ${className}`}
        />
      ) : type === "tags" ? (
        <>
          <div className="flex">
            <input
              type="text"
              name={name}
              id={`form-${name}`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              // onKeyUp={(e) => {
              //   console.log("here" + e.key);

              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     addCategory(e.target.value);
              //     e.target.value = "";
              //   }
              // }}
              title={title}
              list={`form-datalist-${name}`}
              {...props}
              className={`flex-grow border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md ${className}`}
            />
            <button onClick={addCategory} className="text-buff text-4xl pl-2">
              +
            </button>
          </div>
          <div className="border border-buff rounded-md p-3 mt-3 flex flex-wrap">
            {!mulValues?.length && (
              <span className="italic text-sm font-medium text-buff">
                No Categories
              </span>
            )}
            {mulValues?.map((val, index) => (
              <span
                className="text-sm font-medium text-buff p-1 border border-buff rounded-md mr-1 mb-1"
                key={index}
              >
                {typeof val === "string" ? val : val.name ?? val.title}
                <span
                  className="cursor-pointer"
                  onClick={() => removeCategory(index)}
                >
                  ✖
                </span>
              </span>
            ))}
          </div>
        </>
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
          list={listOptions && `form-datalist-${name}`}
          {...props}
          className={`border-2 px-3 py-1.5 shadow-sm placeholder:text-gray-400 border-buff sm:text-sm sm:leading-6 rounded-md ${className}`}
        />
      )}
      <datalist id={`form-datalist-${name}`}>
        {listOptions?.map((cat) => (
          <option key={cat._id} value={cat.name} />
        ))}
      </datalist>
    </div>
  );
};

export default BaseInput;
