import React from "react";

export default function SectionLabel({ children }) {
  return <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-primary"><span className="h-px w-8 bg-primary"/>{children}</div>;
}