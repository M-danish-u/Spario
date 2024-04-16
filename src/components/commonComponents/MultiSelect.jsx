// MultiSelect.js
import React from "react";
import Select from "react-select";

const MultiSelect = ({ options, value, onChange, ...rest }) => {
  return (
    <Select className="mt-2 w-[280px] rounded-md "
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default MultiSelect;
