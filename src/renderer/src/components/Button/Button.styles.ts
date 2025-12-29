import { ColorName } from "@renderer/constants/ui";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none cursor-pointer border",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
        ghost: "bg-transparent",
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
      color: ColorName.PRIMARY,
    },
    compoundVariants: [
      {
        variant: "default",
        color: ColorName.PRIMARY,
        class: "bg-primary text-white border-primary hover:bg-point",
      },
      {
        variant: "default",
        color: ColorName.BLACK,
        class: "bg-black text-white border-black",
      },
      {
        variant: "default",
        color: ColorName.GREY,
        class: "bg-gray-700 text-gray-300 border-gray-700",
      },
      {
        variant: "default",
        color: ColorName.APPLY,
        class: "bg-gray-400 text-white border-gray-400",
      },
      {
        variant: "default",
        color: ColorName.REJECT,
        class: "bg-[#FF5555] text-white border-[#FF5555]",
      },
      {
        variant: "default",
        color: ColorName.APPROVE,
        class: "bg-[#2E8CFF] text-white border-[#2E8CFF]",
      },
      {
        variant: "default",
        color: ColorName.REAPPLY,
        class: "bg-[#FFAB45] text-white border-[#FFAB45]",
      },

      {
        variant: "outline",
        color: ColorName.PRIMARY,
        class: "text-primary border-primary",
      },
      {
        variant: "outline",
        color: ColorName.BLACK,
        class: "text-black border-black hover:bg-black hover:text-white",
      },
      {
        variant: "outline",
        color: ColorName.GREY,
        class: "text-gray-300 border-gray-700 hover:bg-gray-700",
      },
      {
        variant: "outline",
        color: ColorName.APPLY,
        class: "text-gray-400 border-gray-400 hover:bg-gray-400",
      },
      {
        variant: "outline",
        color: ColorName.REJECT,
        class: "text-[#FF5555] border-[#FF5555] hover:bg-[#FF5555]",
      },
      {
        variant: "outline",
        color: ColorName.APPROVE,
        class: "text-[#2E8CFF] border-[#2E8CFF] hover:bg-[#2E8CFF] hover:text-white",
      },
      {
        variant: "outline",
        color: ColorName.REAPPLY,
        class: "text-[#FFAB45] border-[#FFAB45] hover:bg-[#FFAB45] hover:text-white",
      },
      {
        variant: "ghost",
        color: ColorName.PRIMARY,
        class: "text-primary border-none",
      },
      {
        variant: "ghost",
        color: ColorName.BLACK,
        class: "text-black border-none",
      },

      {
        variant: "ghost",
        color: ColorName.GREY,
        class: "text-gray-300 border-none",
      },

      {
        variant: "ghost",
        color: ColorName.APPLY,
        class: "text-gray-400 border-none",
      },
      {
        variant: "ghost",
        color: ColorName.REJECT,
        class: "text-[#FF5555] border-none",
      },
      {
        variant: "ghost",
        color: ColorName.APPROVE,
        class: "text-[#2E8CFF] border-none",
      },
      {
        variant: "ghost",
        color: ColorName.REAPPLY,
        class: "text-[#FFAB45] border-none",
      },
    ],
  }
);
