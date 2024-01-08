import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";

export const CurrentTheme : Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: "#ffffff",
        background: "#000000",
        card: "#9f69fa",
        text: "#ffffff",
        border: "string",
        notification: "string",
        
    },
};