import { DocumentInterface } from "../redux/reducers/documentsReducer";

export const getDocuments = (): Promise<Response> | undefined => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    return fetch(
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get",
      {
        method: "GET",
        headers: { "x-auth": token, "content-type": "application/json" },
      },
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
};

export const addDocument = (
  document: DocumentInterface,
): Promise<Response> | undefined => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    return fetch(
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create",
      {
        method: "POST",
        headers: { "x-auth": token, "content-type": "application/json" },
        body: JSON.stringify(document),
      },
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
};

export const delDocument = (id: string): Promise<Response> | undefined => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    return fetch(
      `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      {
        method: "POST",
        headers: { "x-auth": token, "content-type": "application/json" },
      },
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
};
