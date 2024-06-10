export const loginUser = ({username, password}:{username:string, password:string}): Promise<Response> => {
    return fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  
};