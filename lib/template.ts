export interface Template {
  name: string;
  markdown_template: string;
  language: string;
}

export function addTemplate(temp: Template) {
  let templates: Template[] = loadTemplates();
  templates.push(temp);
  localStorage.setItem("templates", JSON.stringify(templates));
}

export function loadTemplates(): Template[] {
  if (typeof window !== "undefined") {
    let templates: Template[] = JSON.parse(
      localStorage.getItem("templates") || "[]"
    );
    return templates;
  }
  return [];
}
