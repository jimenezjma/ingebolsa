// Eventos entre secciones: la vitrina filtra el inventario y el inventario elige equipo en el formulario.
export const FILTER_EVENT = "ib:filter";
export const PICK_EVENT = "ib:pick";

export function pickMachine(slug: string) {
  window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: slug }));
}
