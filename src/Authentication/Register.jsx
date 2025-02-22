import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Context } from "../Context/MyContext";
import { Input } from "@chakra-ui/react";
import registerImg from "../assets/register.svg";

const Register = () => {
  const { profileUpdate, registerUser, setLoader, isChecked } =
    useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        setLoader(true);
        profileUpdate(data.name, data.photo_url);
        toast.success("Register Successful");
        setLoader(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    reset({
      name: "",
      photo_url: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* <Helmet>
        <title>Register Page</title>
      </Helmet> */}
      <h2 className={`text-2xl font-bold mb-5  text-center ${isChecked ? "text-white" : "text-black"}`}>
        Create your account
      </h2>
      <div
        className={`w-full mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-5 p-4 rounded-md shadow sm:p-8  ${
          isChecked
            ? "bg-white/40 text-white "
            : "bg-white/40 text-black"
        }`}
      >
        <div>
          <img src={registerImg} alt="" />
        </div>

        {/* form */}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm">
                  Your Name
                </label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 text-base-content focus:border-violet-600 !bg-white/60"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="photo_url" className="block text-sm">
                  Photo URL
                </label>
                <Input
                  {...register("photo_url")}
                  type="text"
                  placeholder="Photo URL"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 text-base-content focus:border-violet-600 !bg-white/60"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  type="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 text-base-content focus:border-violet-600 !bg-white/60"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm w-full flex justify-between items-center"
                  >
                    <span>Password</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </label>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 text-base-content focus:border-violet-600 !bg-white/60"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-base-content">
            Already Have an account?
            <Link
              to="/login"
              className="underline text-lg text-blue-400 hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
