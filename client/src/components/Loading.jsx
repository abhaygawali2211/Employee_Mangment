import React from "react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-slate-200"></div>
        <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  );
};