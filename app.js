const GAS_URL = "https://script.google.com/macros/s/AKfycbwf3-qeOFH0jepafg7QYFbDzU0h3lcYOGZWO4OtqsKCsznC9ce4KAgB4lUNlPFVBvMs_w/exec";

async function callGas(api, payload = {}, token = "") {
  const url = new URL(GAS_URL);
  url.searchParams.set("api", api);
  url.searchParams.set("token", token);
  url.searchParams.set("payload", JSON.stringify(payload));
  url.searchParams.set("callback", "cb");

  const res = await fetch(url.toString());
  const txt = await res.text();

  const match = txt.match(/^cb\(([\s\S]*)\);?$/);
  if (!match) {
    throw new Error("Response GAS tidak valid: " + txt);
  }

  return JSON.parse(match[1]);
}

async function testApi() {
  const out = document.getElementById("out");
  out.textContent = "Memuat...";

  try {
    const data = await callGas("getOptions", {});
    out.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent = "ERROR: " + err.message;
  }
}
