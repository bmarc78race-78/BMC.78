import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout() {
  return <div className="min-h-screen overflow-hidden bg-background text-foreground"><Navbar/><main className="pt-20"><Outlet/></main><Footer/></div>;
}