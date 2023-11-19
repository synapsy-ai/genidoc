"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSettings, setSettings } from "@/lib/settings";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getModels } from "@/lib/ai";
export default function ApiPage() {
  let settings = getSettings();
  const [key, setKey] = useState(settings?.key);
  const [models, setModels] = useState(
    settings?.availableModels ?? ["gpt-3.5-turbo"]
  );
  const [model, setModel] = useState(settings?.defaultModel ?? "gpt-3.5-turbo");
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
          <Select
            defaultValue={model}
            onValueChange={(v) => {
              setModel(v);
              if (settings) {
                settings.defaultModel = v;
                setSettings(settings);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {models.sort().map((el, i) => (
                <SelectItem value={el} key={i}>
                  {el}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={async () => {
              setModels(await getModels(settings?.key ?? ""));
              if (settings) {
                settings.availableModels = models;
                setSettings(settings);
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
