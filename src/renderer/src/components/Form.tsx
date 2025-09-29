import React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import InfoIcon from "../assets/icons/info.svg?react";
import cn from "../utils/cn";
import Label from "./Label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { disabled?: boolean }) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("mb-1", className)}
      htmlFor={formItemId}
      disabled={disabled}
      {...props}
    />
  );
}

function FormInput({ className, ...props }: React.ComponentProps<"input">) {
  const { error, formItemId } = useFormField();

  return (
    <input
      data-slot="form-input"
      data-error={!!error}
      id={formItemId}
      aria-invalid={!!error}
      className={cn(
        "text-gray-0 md:text-s font-regular w-full border py-2.5 pl-3 outline-none placeholder:text-gray-300 disabled:border-gray-500 disabled:bg-gray-700 disabled:text-gray-300 disabled:placeholder:text-gray-400 md:h-9 md:rounded-lg md:pr-3 lg:h-12 lg:rounded-xl lg:pr-3 lg:text-[15px]",
        error ? "border-status-error" : "border-gray-600",
        className
      )}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ ...props }: React.ComponentProps<"p">) {
  const { formMessageId, error } = useFormField();

  const body = error ? String(error?.message) : props.children;

  if (!body) {
    return null;
  }

  return (
    <div
      className="flex flex-row items-center gap-1"
      data-slot="form-message"
      id={formMessageId}
      {...props}
    >
      <InfoIcon className={cn("h-4 w-4", error ? "text-status-error" : "text-gray-100")} />
      <span className={cn("lg:text-s text-xs", error ? "text-status-error" : "text-gray-100")}>
        {body}
      </span>
    </div>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
};
