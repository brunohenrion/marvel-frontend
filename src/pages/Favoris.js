// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import logo from "../img/logo.svg";

// const Favoris = ({ setUser, favoris, setFavoris }) => {
//   const [deleteFav, setDeleteFav] = useState();

//   useEffect(() => {
//     const tab = [...favoris];
//     tab.map((elem, index) => {
//       if (deleteFav === elem._id) {
//         tab.splice(index, 1);
//         setFavoris(tab);
//       }
//     });
//   }, [deleteFav, favoris]);

//   return (
//     <div>
//       <header>
//         <Link to={"/"}>
//           <div className="logo">
//             <img src={logo} alt="" />
//           </div>
//         </Link>

//         <div className="button">
//           <Link className="lien" to={"/characters"}>
//             <button>Personnages</button>
//           </Link>

//           <Link className="lien" to={"/favoris"}>
//             <button>Favoris</button>
//           </Link>

//           <Link className="lien" to={"/"}>
//             <button
//               onClick={() => {
//                 setUser();
//               }}
//             >
//               Deconnexion
//             </button>
//           </Link>
//         </div>
//       </header>
//       <div className="cards">
//         {favoris.map((fav) => {
//           return (
//             <div key={fav._id}>
//               <article className="card">
//                 <h3>{fav.title || fav.name}</h3>

//                 <img
//                   src={fav.thumbnail.path + "." + fav.thumbnail.extension}
//                   alt={fav.title}
//                 />
//                 <p className={fav.description ? "card-desc" : "display-none"}>
//                   {fav.description}
//                 </p>
//               </article>
//               <div className="delete-fav">
//                 <span
//                   onClick={() => {
//                     setDeleteFav(fav._id);
//                   }}
//                 >
//                   Delete from Favorites
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Favoris;
