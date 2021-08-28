import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;
    if (token && isCustomAuth) {
      // This will return the decoded data contaoining the user info
      decodeData = jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      //Handle Google token
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {}
};

export default auth;
