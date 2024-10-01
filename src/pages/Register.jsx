import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";

import Logo from "../components/Logo";
import Input from "../components/Input";
import { addUser } from "../api";
import { Loading } from "../constant/icons";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegsiter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        name,
        email,
        password,
        profileImage: "/images/av1.png",
      };
      const response = await addUser(data);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response?.data?.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f7ff] h-lvh pt-4">
      <div className="w-4/5 mx-auto flex items-center justify-center flex-col h-full">
        <Logo />
        <div className="mt-12">
          <h3 className="text-[#343a40] font-medium text-xl text-center">
            Register
          </h3>
          <p className="text-[#7a7f9a] text-sm pt-1 text-center mb-4">
            Get your Chitchat account now.
          </p>
        </div>
        <form
          onSubmit={handleRegsiter}
          className="bg-white w-3/4 mx-auto rounded p-6 max-w-[464px]"
        >
          <div className="flex flex-col gap-5">
            <Input
              label="Name"
              type="text"
              placeholder={"Enter full name"}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              icon={<LuUser2 size={16} color="#7a7f9a" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder={"Enter email"}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdOutlineMailOutline size={16} color="#7a7f9a" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder={"Enter password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              icon={<MdOutlineLock size={16} color="#7a7f9a" />}
            />
          </div>

          <button
            type="submit"
            className="bg-[#7269ef] text-white w-full py-2.5 px-4 rounded-md mt-10"
            disabled={loading}
          >
            {loading && <Loading className={"!size-4"} />} Register
          </button>
        </form>
        <p className="text-[#495059] text-sm mt-4">
          Already have an account ?{" "}
          <Link to={"/"} className="text-[#7269ef] font-medium">
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
