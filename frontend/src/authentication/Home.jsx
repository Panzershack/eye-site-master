// import React, { useEffect } from "react";
// import { signOut } from "firebase/auth";
// import { database } from "./FirebaseConfig";
// import { useNavigate } from "react-router-dom";

// const withAuthProtection = (Component) => {
//   const AuthenticatedComponent = (props) => {
//     const history = useNavigate();

//     useEffect(() => {
//       const user = database.currentUser;
//       if (!user) {
//         // If user is not authenticated, redirect to login page
//         history("/reglog");
//       }
//     }, []);

//     return <Component {...props} />;
//   };

//   return AuthenticatedComponent;
// };

// const HomeScreen = () => {
//   const history = useNavigate();

//   const handleClick = () => {
//     signOut(database)
//       .then(() => {
//         console.log("Signed out successfully");
//         history('/reglog');
//       })
//       .catch(error => {
//         console.error("Error signing out:", error.message);
//       });
//   };

//   return (
//     <div>
//       <h1>Home</h1>
//       <button onClick={handleClick}>Sign Out</button>
//     </div>
//   );
// };

// export default withAuthProtection(HomeScreen);
