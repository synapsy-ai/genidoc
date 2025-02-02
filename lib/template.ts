export interface Template {
  name: string;
  markdown_template: string;
  language: string;
  id: string;
}

export function addTemplate(temp: Template) {
  let templates: Template[] = loadTemplates();
  templates.push(temp);
  localStorage.setItem("templates", JSON.stringify(templates));
}

export function loadTemplates(): Template[] {
  if (typeof window !== "undefined") {
    let templates: Template[] = JSON.parse(
      localStorage.getItem("templates") || "[]",
    );
    return templates;
  }
  return [];
}

export function saveTemplates(templates: Template[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("templates", JSON.stringify(templates));
  }
}

export function deleteTemplate(temp: Template) {
  let templates: Template[] = loadTemplates();
  let index: number = -1;
  for (let i = 0; i < templates.length; i++) {
    if (templates[i].id === temp.id) {
      index = i;
    }
  }
  if (index > -1) templates.splice(index, 1);
  localStorage.setItem("templates", JSON.stringify(templates));
}
