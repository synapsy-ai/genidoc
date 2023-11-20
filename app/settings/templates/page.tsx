"use client";
import TemplateItem from "@/components/template-item";
import { loadTemplates } from "@/lib/template";
import { useEffect, useState } from "react";

export default function EditTemplates() {
  let templates = loadTemplates();
  const [temp, setTemp] = useState(templates);
  return (
    <div className="space-y-2">
      <div>
        <h4 className="font-bold">Edit templates</h4>
        <p>Edit your code templates.</p>
      </div>
      <div>
        {temp.map((el, i) => (
          <TemplateItem template={el} key={i} setTemplates={setTemp} />
        ))}
      </div>
    </div>
  );
}
