export function applyLinkage(linkage, sourceValue, formData) {
  if (!linkage) return null;

  switch (linkage.type) {
    case "direct":
      return sourceValue;

    case "mapping":
      return linkage.mapping[sourceValue] || "";

    case "function":
      return linkage.fn(sourceValue, formData);

    case "concatenate":
      return linkage.fields
        .map((f) => formData[f] || "")
        .join(linkage.separator || " ");

    default:
      return null;
  }
}
