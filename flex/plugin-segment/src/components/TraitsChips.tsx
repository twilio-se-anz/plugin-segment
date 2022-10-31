import React, { useEffect, useState } from "react";
// import { getTraitsForUser } from "../services/segmentService";
// import {
//   DataGrid,
//   DataGridHead,
//   DataGridRow,
//   DataGridHeader,
//   DataGridBody,
//   DataGridCell,
// } from "@twilio-paste/core";

type Props = {};

const TraitsChips = (props: Props) => {
  //   const [traits, setTraits] = useState({});

  //   useEffect(() => {
  //     async function getTraits() {
  //       const traitsObj = await getTraitsForUser("00Q4Y0000023WEcUAM");
  //       setTraits(traitsObj);
  //     }
  //     getTraits();
  //   }, []);

  return <></>;
  //   return (
  //     <>
  //       <DataGrid aria-label="User information table" striped>
  //         <DataGridHead>
  //           <DataGridRow>
  //             {/* <DataGridHeader>Trait</DataGridHeader>
  //             <DataGridHeader>Value</DataGridHeader> */}
  //           </DataGridRow>
  //         </DataGridHead>
  //         <DataGridBody>
  //           {Object.keys(traits).map((trait, triatIndex) => (
  //             <DataGridRow key={"row-" + triatIndex}>
  //               <DataGridCell key={"cell-" + triatIndex + "-0"}>
  //                 {trait}
  //               </DataGridCell>
  //               <DataGridCell key={"cell-" + triatIndex + "-0"}>
  //                 {/* {traits[trait]} */}
  //               </DataGridCell>
  //             </DataGridRow>
  //           ))}
  //         </DataGridBody>
  //       </DataGrid>
  //     </>
  //   );
};

export default TraitsChips;
