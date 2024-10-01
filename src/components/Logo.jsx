import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/images/logo.png"
        alt="logo"
        className="size-8 object-contain"
      />
      <p className="text-[#495057] font-semibold text-2xl">Chitchat</p>
    </div>
  );
};

export default Logo;
