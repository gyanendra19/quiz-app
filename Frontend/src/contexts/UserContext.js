import React, {useContext} from "react";

export const ThemeContext = React.createContext();

export default function UseTheme(){
    return useContext(ThemeContext)
}