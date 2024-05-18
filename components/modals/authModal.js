import React from 'react';
import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";

export const Modal = ({isOpen, type, children, successColor = "#4CAF50", failureColor = "#F44336"}) => {

    if (!isOpen) return null;

    const Icon = type === "success" ? GoCheckCircleFill : GoXCircleFill;
    const color = type === "success" ? successColor : failureColor;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-dlur-sm flex flex-col justify-center items-center">
        <div className="flex flex-col gap-y-4 bg-white w-1/3 py-8 rounded-md">
            <div className="flex justify-center items-center">
                <Icon color={color} size="100"/>
            </div>
            {children}
        </div>
    </div>
  )
}
