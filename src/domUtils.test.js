import DomUtils from "./domUtils";

describe("DomUtils – fully generic createElement", () => {

  test("creates a div with className, id, and textContent", () => {
    const el = DomUtils.createElement("div", {
      id: "main",
      className: "container",
      textContent: "Hello",
    });

    expect(el.tagName).toBe("DIV");
    expect(el.id).toBe("main");
    expect(el.className).toBe("container");
    expect(el.textContent).toBe("Hello");
  });

  test("creates a paragraph with dataset", () => {
    const el = DomUtils.createElement("p", {
      dataset: { userId: "42", role: "admin" },
      textContent: "Paragraph",
    });

    expect(el.tagName).toBe("P");
    expect(el.dataset.userId).toBe("42");
    expect(el.dataset.role).toBe("admin");
    expect(el.textContent).toBe("Paragraph");
  });

  test("creates a table with attributes", () => {
    const el = DomUtils.createElement("table", {
      border: "1",
      summary: "User table",
    });

    expect(el.tagName).toBe("TABLE");
    expect(el.getAttribute("border")).toBe("1");
    expect(el.getAttribute("summary")).toBe("User table");
  });

  test("creates a button with style and boolean props", () => {
    const el = DomUtils.createElement("button", {
      disabled: true,
      style: { color: "white", backgroundColor: "blue" },
      textContent: "Click Me",
    });

    expect(el.tagName).toBe("BUTTON");
    expect(el.disabled).toBe(true);
    expect(el.style.color).toBe("white");
    expect(el.style.backgroundColor).toBe("blue");
    expect(el.textContent).toBe("Click Me");
  });

  test("unknown props fallback to attribute", () => {
    const el = DomUtils.createElement("input", {
      placeholder: "Type here",
      "data-test": "xyz",
    });

    expect(el.getAttribute("placeholder")).toBe("Type here");
    expect(el.getAttribute("data-test")).toBe("xyz");
  });

  test("appendToParent works correctly", () => {
    const parent = document.createElement("div");
    const child = DomUtils.createElement("p", { textContent: "Child" });

    DomUtils.appendToParent(parent, child);

    expect(parent.children.length).toBe(1);
    expect(parent.firstChild.textContent).toBe("Child");
  });

  test("throws error if type is missing", () => {
    expect(() => DomUtils.createElement()).toThrow("Element type is required");
  });

  test("throws error if appendToParent missing parent or child", () => {
    const el = DomUtils.createElement("div", { textContent: "Hello" });
    expect(() => DomUtils.appendToParent(null, el)).toThrow("Parent and child are required");
    expect(() => DomUtils.appendToParent(document.body, null)).toThrow("Parent and child are required");
  });

});
