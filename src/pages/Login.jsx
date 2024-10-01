import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Input from "../components/Input";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { Loading } from "../constant/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) || null;
    if (user) {
      navigate("/chat");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login({
        email,
        password,
      });
      localStorage.setItem("userData", JSON.stringify(response.data?.data));
      navigate("/chat");
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#f7f7ff] h-lvh">
      <div className="md:w-4/5 w-full mx-auto flex items-center justify-center flex-col h-full">
        <Logo />
        <div className="mt-12">
          <h3 className="text-[#343a40] font-medium sm:text-xl text-lg text-center">
            Sign in
          </h3>
          <p className="text-[#7a7f9a] text-sm sm:text-xs pt-1 text-center mb-4">
            Sign in to continue to Chitchat.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-white w-3/4 mx-auto rounded p-6 max-w-[464px]"
        >
          <div className="flex flex-col gap-5">
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
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              icon={<MdOutlineLock size={16} color="#7a7f9a" />}
              placeholder={"Enter password"}
            />
          </div>
          <div className="flex justify-end mt-1">
            <Link to={"/signup"} className="sm:text-sm text-xs text-[#7a7f9a]">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-[#7269ef] text-white w-full sm:py-2.5 py-2 sm:text-base text-xs px-4 rounded-md mt-10"
          >
            {loading && <Loading className={"!size-4"} />} Sign in
          </button>
        </form>
        <p className="text-[#495059] sm:text-sm text-xs mt-4">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-[#7269ef]">
            Signup now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
