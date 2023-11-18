import { Template, loadTemplates } from "./template";

export interface Generation {
  template?: Template;
  snippet: string;
  result: string;
  date: Date;
  index?: number;
}

export function getGenerations(): Generation[] {
  let gens: Generation[] = [];
  if (typeof window !== "undefined") {
    gens = JSON.parse(localStorage.getItem("genidoc_gens") || "[]");
    return gens;
  }
  return gens;
}

export function addGeneration(gen: Generation) {
  if (typeof window !== "undefined") {
    let gens = getGenerations();
    gens.push(gen);
    localStorage.setItem("genidoc_gens", JSON.stringify(gens));
  }
}

export function getSortedGenerations(): SortedGenerations[] {
  let sort: SortedGenerations[] = [];
  let no_template = [];
  if (typeof window !== "undefined") {
    const gens = getGenerations();
    const templates: Template[] = loadTemplates();
    const t_names: string[] = [];
    for (let i = 0; i < templates.length; i++) {
      sort.push({ gens: [], name: templates[i].name });
      if (!t_names.includes(templates[i].name)) {
        t_names.push(templates[i].name);
      }
    }

    for (let i = 0; i < gens.length; i++) {
      if (gens[i].template) {
        gens[i].index = i;
        let j = t_names.indexOf(gens[i].template?.name || "");
        console.log(j);
        if (j >= 0) {
          sort[j].gens.push(gens[i]);
        } else {
          no_template.push(gens[i]);
        }
      }
    }
  }
  if (no_template.length > 0) sort.push({ gens: no_template, name: "Misc" });
  return sort;
}

export interface SortedGenerations {
  gens: Generation[];
  name: string;
}
