import { createContext, useContext } from "react";
import React, { useState } from "react";
export const ConfigContext = createContext();
export const ConfigDispatcherContext = createContext();

function ConfigProvider({ children }) {
       const [config, setConfig] = useState({
   });
    return (
    <ConfigContext.Provider value={config}>
        <ConfigDispatcherContext.Provider value={setConfig}>
            {children}
        </ConfigDispatcherContext.Provider>
    </ConfigContext.Provider>
 );
}
function useConfigState() {
   return useContext(ConfigContext);
}
function useConfigSetState() {
  return useContext(ConfigDispatcherContext);
}
export { useConfigState, useConfigSetState };
export default ConfigProvider;