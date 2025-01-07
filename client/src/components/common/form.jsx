import { Label } from "@radix-ui/react-label";
import PropTypes from "prop-types";

function CommonForm({ formData, onChange, onSubmit, buttonText }) {
  CommonForm.propTypes = {
    formData: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      bio: PropTypes.string,
      gender: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
  };
  return (
    <form
      onSubmit={onSubmit}
      className=" bg-slate-800 shadow-lg rounded-lg p-8 w-[400px] max-w-lg mx-auto"
    >
      <div className="flex flex-col gap-6">
        {/* Username Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="username" className="text-white text-sm font-medium">
            Username
          </Label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formData.username || ""}
            onChange={onChange}
          />
        </div>

        {/* Password Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="password" className="text-white  text-sm font-medium">
            Password
          </Label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formData.password || ""}
            onChange={onChange}
          />
        </div>

        {/* Bio Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="bio" className="text-white  text-sm font-medium">
            Bio
          </Label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself"
            className="border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32 resize-none"
            value={formData.bio || ""}
            onChange={onChange}
          ></textarea>
        </div>

        {/* Gender Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="gender" className="text-white text-sm font-medium">
            Gender
          </Label>
          <select
            id="gender"
            name="gender"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formData.gender || ""}
            onChange={onChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;
