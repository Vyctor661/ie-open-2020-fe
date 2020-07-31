// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
// import { Homework } from "../../utils/interfaces";

// import { useParams } from "react-router-dom";

// import "./index.css";
// import { getUserData, getHwForClass } from "../../utils/helpers";

// const allTeachers = async (users: number[]): Promise<string[]> =>  await Promise.all(
//     users.map(async (value) => {
//       console.log(value);

//         const userData = await getUserData(value);
//         return userData.name as string;
//     })
// );

// const getAllHomework = async (classid: number): Promise<Array<Homework>> =>{
//   const resp = await getHwForClass(classid);

//   return resp;
// }

// const generateHWList = async (hw: Array<Homework>) =>{
//     const list = hw.map(async (value, index) => {
//             return (
//               <tr
//                 className="listItemWrapper"
//                 key={index + "class" + value.name}
//                 onClick={() => {
//                   window.location.replace("#/classes/" + value.id);
//                 }}
//               >
//                 <td>{value.}</td> /// the username
//                 <td>{value.name}</td> /// the homework name
//                 <td>{value.}</td> /// the homework content
//               </tr>
//             );
//           })
//         return (
//           <table className="classesTable" key="loadedClasses">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Homework</th>
//                 <th>Answer</th>
//               </tr>
//             </thead>
//             <tbody>{list}</tbody>
//           </table>
//         );

//         }

// export default () => {
//   const [generatedHwList, setGeneratedHwList] = useState<Array<JSX.Element>>([<div key="defaultKeyforhwlist"></div>])
//   const { id } = useParams();
//   const Update = async ()=> {
//     const hw = await getAllHomework(id);
//       const list =  setGeneratedHwList(await generateHWList(hw))
//   }

//   return (
//     <div>
//       <h2>All class's homework. </h2>
//       {generateHWList}
//     </div>
//   );
// };
