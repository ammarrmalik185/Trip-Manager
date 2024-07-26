import {DarkTheme, Theme} from "@react-navigation/native";
import {palette} from "./colors.ts";

export const CurrentTheme : Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        ...palette
    },
};
