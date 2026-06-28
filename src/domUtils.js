export default class DomUtils {
  static createElement(type, props) {
    if (!type) throw new Error("Element type is required");
    props = props || {};

    const el = document.createElement(type);

    // Iterate through all properties in the object
    for (const key in props) {
      const value = props[key];

      if (!value) continue; // skip null/undefined

      // dataset and style are objects, merge them
      if (key === "dataset" && typeof value === "object") {
        Object.assign(el.dataset, value);
      } else if (key === "style" && typeof value === "object") {
        Object.assign(el.style, value);
      } else if (key in el) {
        // if property exists on element, assign it
        el[key] = value;
      } else {
        // otherwise, set as attribute
        el.setAttribute(key, value);
      }
    }

    return el;
  }

  static appendToParent(parent, child) {
    if (!parent || !child) throw new Error("Parent and child are required");
    parent.appendChild(child);
  }
}
