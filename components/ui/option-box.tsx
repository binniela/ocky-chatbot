import * as React from "react"
import { cn } from "@/lib/utils"

interface OptionBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  children: React.ReactNode
}

export function OptionBox({ selected, children, className, ...props }: OptionBoxProps) {
  return (
    <button
      className={cn(
        "w-full p-4 text-left rounded-lg border transition-all duration-200",
        "hover:border-[#2864ec] hover:shadow-sm",
        selected ? "border-[#2864ec] bg-blue-50/50" : "border-gray-200 bg-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}