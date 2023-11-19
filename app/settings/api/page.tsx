"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSettings, setSettings } from "@/lib/settings";
import { useState } from "react";
import { getModels } from "@/lib/ai";
import { ModelCombobox } from "@/components/model-combobox";
export default function ApiPage() {
  let settings = getSettings();
  const [key, setKey] = useState(settings?.key);
  const [models, setModels] = useState(
    settings?.availableModels ?? ["gpt-3.5-turbo"]
  );
  const [model, setModel] = useState(settings?.defaultModel ?? "gpt-3.5-turbo");

  function setDefaultModel(model: string) {
    setModel(model);
    if (settings) {
      settings.defaultModel = model;
      setSettings(settings);
    }
  }

  return (
    <div className="space-y-2">
      <div>
        <h4 className="font-bold">API Key</h4>
        <p>Your OpenAI API Key.</p>
        <Input
          type="password"
          value={key}
          onChange={(v) => {
            setKey(v.target.value);
            if (settings) settings.key = v.target.value;
            setSettings(settings || { key: v.target.value });
          }}
        />
      </div>
      <div>
        <h4 className="font-bold">Default Model</h4>
        <p>The default OpenAI to use.</p>
        <div className="flex space-x-2">
          <ModelCombobox
            defaultValue={model}
            models={models}
            setModel={setDefaultModel}
          />
          <Button
            onClick={async () => {
              const m = await getModels(settings?.key ?? "");
              setModels(m);
              if (settings) {
                settings.availableModels = m;
                setSettings(settings);
              } else {
                setSettings({ key: key ?? "", availableModels: m });
              }
            }}
            className="p-0"
            variant="link"
          >
            Refresh model list
          </Button>
        </div>
      </div>
    </div>
  );
}
