import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none cursor-pointer border",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "",
        black: "",
        grey: "",
        apply: "",
        reject: "",
        approve: "",
        reapply: "",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        class: "bg-primary text-white border-primary hover:bg-point",
      },
      {
        variant: "default",
        color: "black",
        class: "bg-black text-white border-black",
      },
      {
        variant: "default",
        color: "grey",
        class: "bg-gray-700 text-gray-300 border-gray-700",
      },
      {
        variant: "default",
        color: "apply",
        class: "bg-gray-400 text-white border-gray-400",
      },
      {
        variant: "default",
        color: "reject",
        class: "bg-[#FF5555] text-white border-[#FF5555]",
      },
      {
        variant: "default",
        color: "approve",
        class: "bg-[#2E8CFF] text-white border-[#2E8CFF]",
      },
      {
        variant: "default",
        color: "reapply",
        class: "bg-[#FFAB45] text-white border-[#FFAB45]",
      },

      {
        variant: "outline",
        color: "primary",
        class: "text-primary border-primary",
      },
      {
        variant: "outline",
        color: "black",
        class: "text-black border-black hover:bg-black hover:text-white",
      },
      {
        variant: "outline",
        color: "grey",
        class: "text-gray-300 border-gray-700 hover:bg-gray-700",
      },
      {
        variant: "outline",
        color: "apply",
        class: "text-gray-400 border-gray-400 hover:bg-gray-400",
      },
      {
        variant: "outline",
        color: "reject",
        class: "text-[#FF5555] border-[#FF5555] hover:bg-[#FF5555]",
      },
      {
        variant: "outline",
        color: "approve",
        class: "text-[#2E8CFF] border-[#2E8CFF] hover:bg-[#2E8CFF] hover:text-white",
      },
      {
        variant: "outline",
        color: "reapply",
        class: "text-[#FFAB45] border-[#FFAB45] hover:bg-[#FFAB45] hover:text-white",
      },
    ],
  }
);
