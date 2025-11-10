const API_URL = "http://localhost:3000/api";

export async function apiGet(url: string) {
  const res = await fetch(API_URL + url);
  return res.json();
}

export async function apiPost(url: string, body: any) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiPut(url: string, body: any) {
  const res = await fetch(API_URL + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiDelete(url: string) {
  const res = await fetch(API_URL + url, { method: "DELETE" });
  return res.json();
}
