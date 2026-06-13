import { IconType } from "react-icons";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, 
  SiMongodb, SiTailwindcss, SiFramer, SiHtml5, SiCss, SiGit, 
  SiPostgresql, SiDocker, SiFirebase, SiExpress, SiRedux, SiUpwork,
  SiVite, SiPython, SiCplusplus, SiC, SiGithub, SiFigma, SiVercel, SiLinux,
  SiRust,
  SiGo,
  SiFastapi,
  SiLaravel
} from "react-icons/si";
import { FaDatabase, FaServer, FaCode } from "react-icons/fa";

export const getTechIcon = (name: string): IconType | null => {
  const n = name.toLowerCase().replace(/\s/g, "");
  
  if (n.includes("react")) return SiReact;
  if (n.includes("next")) return SiNextdotjs;
  if (n.includes("typescript") || n === "ts") return SiTypescript;
  if (n.includes("javascript") || n === "js") return SiJavascript;
  if (n.includes("node")) return SiNodedotjs;
  if (n.includes("mongo")) return SiMongodb;
  if (n.includes("tailwind")) return SiTailwindcss;
  if (n.includes("framer")) return SiFramer;
  if (n.includes("html")) return SiHtml5;
  if (n.includes("css")) return SiCss;
  if (n.includes("git") && !n.includes("hub")) return SiGit;
  if (n.includes("github")) return SiGithub;
  if (n.includes("postgres")) return SiPostgresql;
  if (n.includes("docker")) return SiDocker;
  if (n.includes("firebase")) return SiFirebase;
  if (n.includes("express")) return SiExpress;
  if (n.includes("redux")) return SiRedux;
  if (n.includes("upwork")) return SiUpwork;
  if (n.includes("vite")) return SiVite;
  if (n.includes("python")) return SiPython;
  if (n.includes("c++")) return SiCplusplus;
  if (n === "c") return SiC;
  if (n.includes("figma")) return SiFigma;
  if (n.includes("vercel")) return SiVercel;
  if (n.includes("linux")) return SiLinux;
  if (n.includes("db") || n.includes("sql")) return FaDatabase;
  if (n.includes("server") || n.includes("api")) return FaServer;
  if (n.includes("rust")) return SiRust;
  if (n.includes("go") || n.includes("golang")) return SiGo;
  if (n.includes("fastapi") || n.includes("FastAPI") || n.includes("fast")) return SiFastapi;
  if (n.includes("laravel")) return SiLaravel;
  
  return FaCode;
};
