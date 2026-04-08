export async function loadEnv() {
  try {
    const response = await fetch("./env");
    if (!response.ok) throw new Error("env file not found");
    const text = await response.text();
    const env = {};

    text.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith("#")) return;
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join("=").trim();
      }
    });
    return env;
  } catch (error) {
    console.error("Environment loading failed:", error);
    return {};
  }
}
