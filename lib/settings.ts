export interface Settings {
  key: string;
  availableModels?: string[];
  defaultModel?: string;
}

export function getSettings(): Settings | undefined {
  if (typeof window !== "undefined") {
    let s: Settings = JSON.parse(
      localStorage.getItem("genidoc_settings") || "{}",
    );
    return s;
  }
  return undefined;
}

export function setSettings(settings: Settings) {
  localStorage.setItem("genidoc_settings", JSON.stringify(settings));
}

export function resetSettings() {
  setSettings({
    key: "",
    defaultModel: "gpt-3.5-turbo",
    availableModels: ["gpt-3.5-turbo"],
  });
}
