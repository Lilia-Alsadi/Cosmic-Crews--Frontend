import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ label, type = "text", placeholder, icon: Icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-purple-500/70 focus:bg-slate-800/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] ${
            Icon ? "pl-10" : ""
          } ${isPassword ? "pr-10" : ""}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
