"use client";

import {
  Check,
  CircleCheck,
  CreditCard,
  User,
  ShoppingCart,
  Truck,
} from "lucide-react";
import * as React from "react";

import { cn } from "./utils";

const steps = [
  { name: "Carrinho", icon: ShoppingCart },
  { name: "Dados pessoais", icon: User },
  { name: "Entrega", icon: Truck },
  { name: "Pagamento", icon: CreditCard },
  { name: "Concluir", icon: CircleCheck },
];

interface StepperCheckoutProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
}

export function StepperCheckout({
  currentStep,
  className,
  ...props
}: StepperCheckoutProps) {
  return (
    <div
      className={cn("w-full max-w-[814px] mx-auto py-10 px-4", className)}
      {...props}
    >
      <div className="flex items-center h-[18px]">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={step.name}>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={cn(
                    "flex items-center justify-center transition-colors duration-300",
                    isCompleted
                      ? "text-gray-800"
                      : isActive ? "text-[#0597F2]" : "text-gray-400"
                  )}
                >
                  {isCompleted ? <Check className="w-[18px] h-[18px]" /> : <step.icon className="w-[18px] h-[18px]" />}
                </div>
                <p className={cn("text-[16px] leading-[18px] font-medium transition-colors duration-300", isCompleted ? "text-gray-800" : isActive ? "text-[#0597F2]" : "text-gray-400")}>
                  {step.name}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className={cn("flex-1 h-px mx-4 transition-colors duration-500", isCompleted ? "bg-gray-800" : "bg-gray-300")} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}