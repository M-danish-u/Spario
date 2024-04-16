// Input.js
import React from 'react';

const Input = ({ label, type, id, register, errors, placeholder }) => {
  return (
    <div className="relative  mb-3">
      <label className='' htmlFor={id}>{label}</label>
      <input 
        type={type}
        id={id}
        {...register(id)} // Register the input field with React Hook Form
        placeholder={placeholder}
        className="peer block min-h-[auto] h-12 w-full mt-3 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
      />
      {/* Display validation error message if exists */}
      {errors && errors[id] && (
        <div className="text-red-500">{errors[id].message}</div>
      )}
    </div>
  );
};

export default Input;
