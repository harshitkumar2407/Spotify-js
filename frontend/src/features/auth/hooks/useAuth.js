import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { loginApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import {loginApiAction} from '../state/authAction'

export const useAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch()

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let handleLoginForm = async (data) => {
    setLoginError("");

    try {
      // let response = await loginApi(data);
      let response = await dispatch(loginApiAction(data)).unwrap();
      console.log(response);
      if (!response?.accessToken) {
        throw new Error("Login response did not include an access token.");
      }

      localStorage.setItem("accessToken", response.accessToken);
      navigate("/main");
      
    } catch (error) {
      console.error("Login failed", error);
      setLoginError(
        error instanceof Error ? error.message : "Unable to log in. Please try again.",
      );
    }
  };

  let handleRegisterForm = (data) => {
    console.log("register data", data);
  };

  return {
    handleLoginForm,
    handleRegisterForm,
    register,
    handleSubmit,
    errors,
    loginError,
    showPassword,
    setShowPassword,
    navigate,
  };
};
