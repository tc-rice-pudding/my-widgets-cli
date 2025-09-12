const modules: Record<string, Component> = import.meta.glob(
  "./*.vue",
  {
    eager: true,
    import: "default",
  }
);

const components = Object.keys(modules).reduce((acc, path) => {
  const name =
    path
      .split("/")
      .pop()
      ?.replace(/\.vue$/, "") || "";
  acc[name] = modules[path];
  return acc;
}, {} as Record<string, Component>);

export default components;
