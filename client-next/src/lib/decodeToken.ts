import jwtDecode from "jwt-decode";

export const decode = (token: any) => {
  const decode: any = jwtDecode(token);

  const { userId } = decode;

  return userId;
};
