"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function PasswordInput({ className, showStrength, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getStrength(password);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", props.error && "border-destructive focus-visible:ring-destructive")}
          value={password}
          onChange={handleChange}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      
      {showStrength && (
        <div className="space-y-1.5 pt-1">
          <div className="flex h-1 w-full gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-full flex-1 rounded-full bg-border transition-all",
                  strength >= level && strength < 3 ? "bg-amber-500" : "",
                  strength >= level && strength >= 3 ? "bg-emerald-500" : "",
                  strength >= level && strength === 1 ? "bg-rose-500" : ""
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {strength === 0 && "Enter password"}
            {strength === 1 && "Weak"}
            {strength === 2 && "Fair"}
            {strength === 3 && "Good"}
            {strength === 4 && "Strong"}
          </p>
        </div>
      )}
    </div>
  );
}
