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
