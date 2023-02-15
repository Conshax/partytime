import axios from "axios";

export async function getFeedText(uri: string): Promise<string> {
  if (uri.startsWith(`http`)) {
    const response = await axios.get(uri, {
      headers: {
        "user-agent": "partytime/conshax",
      },
    });
    return response.data;
  }
  return "";
}
