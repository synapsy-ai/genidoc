export interface Settings {
  key: string;
  availableModels?: string[];
  defaultModel?: string;
}

export function getSettings(): Settings | undefined {
  if (typeof window !== "undefined") {
    let s: Settings = JSON.parse(
      localStorage.getItem("genidoc_settings") || "{}"
    );
    return s;
  }
  return undefined;
}

export function setSettings(settings: Settings) {
  localStorage.setItem("genidoc_settings", JSON.stringify(settings));
}
