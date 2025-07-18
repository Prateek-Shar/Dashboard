// import { getUser } from "./sessions.js";
// import { redirect } from "react-router-dom"; // Note: Works only in frontend. Not in Express

// const handle = async (req, res, next) => {
//     const cookie_info = req.cookies.SessionID;

//     if (!cookie_info) {
//         return res.redirect("/"); // ✅ Use `res.redirect` in Express, NOT `redirect()` from React Router
//     }

//     const user = getUser(cookie_info);
//     if (!user) {
//         return res.redirect("/");
//     }

//     req.user = user;
//     next();
// };

// export default handle;
