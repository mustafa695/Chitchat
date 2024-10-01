import React from "react";

const Input = ({
  label = "Label",
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <p className="pb-1.5 text-[#495057] font-medium sm:text-[15px] text-xs">{label}</p>
      <div className="flex sm:h-11 h-10 bg-white rounded-md border border-[#e6ebf5] w-full">
        <div className="w-12 bg-[#f8f9fa] flex items-center justify-center">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 h-full py-2 px-4 outline-none sm:text-sm text-xs text-[#495057]"
          value={value}
          required={required}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
