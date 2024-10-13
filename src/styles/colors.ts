import {SettingsManager} from "../helpers/SettingsManager.ts";

const darkModeColors = {
    primary: "#5c8166",     // Bright Teal for highlights and call-to-action buttons
    secondary: "#b34747",   // Soft Coral for secondary buttons and highlights
    background: "#1C3043",  // Very Dark Grey for the main background
    card: "#2C4C8F",        // Slightly Lighter Grey for card and panel backgrounds
    text: "#ffffff",        // Light Grey for text
    border: "#777777",      // Dark Grey for borders (to provide subtle contrast),
    placeholder: "#e0e0e0"
};

const lightModeColors = {
    primary: "#4cd7d0",    // Soft Teal for highlights and call-to-action buttons
    secondary: "#ff6b6b",  // Coral for secondary buttons and highlights
    background: "#ffffff", // White for the main background
    card: "#f0f0f0",       // Light Grey for card and panel backgrounds
    text: "#333333",       // Dark Grey for text
    border: "#cccccc",     // Light Grey for borders (providing subtle contrast).
    placeholder: "#333333"
};

const colorfulModeColors = {
    primary: "#ff4081",     // Vivid Pink for highlights and call-to-action buttons
    secondary: "#7c4dff",   // Bright Purple for secondary buttons and highlights
    background: "#ffffff",  // White for the main background
    card: "#e1bee7",        // Light Purple for card and panel backgrounds
    text: "#212121",        // Deep Grey for text
    border: "#cddc39",      // Lime Green for borders (adding a fun contrast)
    placeholder: "#212121"
};

const monochromeModeColors = {
    primary: "#000000",     // Black for highlights and call-to-action buttons
    secondary: "#333333",   // Dark Grey for secondary buttons and highlights
    background: "#ffffff",  // White for the main background
    card: "#f0f0f0",        // Light Grey for card and panel backgrounds
    text: "#000000",        // Black for text
    border: "#666666",      // Medium Grey for borders (adding subtle contrast)
    placeholder: "#666666"
}

const themes = {
    dark: darkModeColors,
    light: lightModeColors,
    colorful: colorfulModeColors,
    monochrome: monochromeModeColors
}

let currentTheme = themes.dark;

switch (SettingsManager.settings.theme) {
    case "light":
        currentTheme = themes.light;
        break;
    case "colorful":
        currentTheme = themes.colorful;
        break;
    case "monochrome":
        currentTheme = themes.monochrome;
        break;
    default:
        currentTheme = themes.dark;
}

export const palette = currentTheme;

