import { useState } from "react";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="w-full bg-[#023A55] my-10 py-16 rounded-md">
      <div className="w-4/5 mx-auto lg:px-20 px-3 py-10 text-center bg-[#FFFFFF] rounded-lg">
        <h1 className="text-5xl font-bold text-black tracking-widest">Newsletter</h1>
        <p className="text-black">Get our weekly newsletter</p>
        <form onSubmit={handleSubmit} className="w-full flex justify-center gap-1 lg:gap-5 lg:px-10">
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input bg-gray-300 mt-5 px-5 rounded-full w-full py-2 focus:outline-none"
          />
          <input
            className="form-input mt-5 px-5 py-2 bg-[#023A55] rounded-full text-white"
            type="submit"
            value="Subscribe"
          />
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
