import React from "react";
import FIcon from "./FIcon";
import { useSetting } from "@/context/SettingProvider";

export default function TextLogo() {
  const { setting } = useSetting();
  return (
    <div className="flex w-fit items-center justify-around gap-2 group">
      <div className="-rotate-12 group-hover:rotate-12 transition-all transform text-2xl text-purple-600 dark:text-white">
        <FIcon icon="mobile-screen" />
      </div>
      <div className="space-x-1 border-r-2 border-t-2 border-b-2 border-purple-600 py-1 pr-2 text-2xl font-bold tracking-wider dark:border-white">
        <span className="text-blue-600 dark:text-blue-300">
          {setting?.header?.text_logo}
        </span>
      </div>
    </div>
  );
}
