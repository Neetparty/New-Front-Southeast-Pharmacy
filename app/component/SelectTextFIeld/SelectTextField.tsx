// "use client"

// import React, { useEffect, useRef, useState } from "react";
// import styles from "./SelectTextField.module.css";
// import { Category } from "@/app/types/category";

// export interface SelectOption extends Category{}; 

// type SingleSelectProps = {  
//   multiple?: false;
//   value?: SelectOption;
//   onChange?: (value: SelectOption | undefined) => void;
// };

// type MultiSelectProps = {
//   multiple: true;
//   value: SelectOption[];
//   onChange?: (value: SelectOption[] | undefined) => void;
// };

// type SelectTextFieldProps = {
//   options: SelectOption[];
// } & (SingleSelectProps | MultiSelectProps);

// interface State {
//   isOpen: boolean;
//   hilightedIndex: number;
// }

// const SelectTextField: React.FC<SelectTextFieldProps> = ({
//   multiple,
//   options,
//   value,
//   onChange,
// }) => {


//   const containerRef = useRef<HTMLDivElement>(null);

//   const [state, setState] = useState<State>({
//     isOpen: false,
//     hilightedIndex: 0,
//   });

//   const clearOption = () => {
//     multiple ? onChange?.([]) : onChange?.(undefined);
//   };

//   const SelectOption = (option: SelectOption) => {
//     if (multiple) {
//       if (value?.includes(option)) {
//         onChange?.(value.filter((o) => o !== option));
//       } else {
//         onChange?.([...value, option]);
//       }
//     } else {
//       if (option !== value) onChange?.(option);
//     }
//     return option.name; // add this line to return a string
//   };
  

//   const isOptionSelected = (option: SelectOption): boolean => {
//     // //@ts-ignore
//     // console.log(option)
//     // console.log(value)
//     return multiple ? checkDuplicate(value, option) : option.id === value!.id;
//   };

//   const checkDuplicate = (value: SelectOption[], option:SelectOption):boolean => {
//     let check = false;

//     value?.forEach((elem:SelectOption) => {
//       if(elem.id === option.id){
//         check = true;
//         return check
//       }
//     })
//     return check
//   }

//   useEffect(() => {
//     if (state.isOpen) {
//       setState({ ...state, hilightedIndex: 0 });
//     }
//   }, [state.isOpen]);

//   useEffect(() => {
//     const handler = (e:KeyboardEvent) => {
//         if(e.target != containerRef.current) return;
//         switch (e.code) {
//             case "Enter":
//             case "Space":
//                 setState(prev=>({...prev,isOpen:!prev.isOpen}))
//                 if(state.isOpen) SelectOption(options[state.hilightedIndex])
//                 break;
//             case "ArrowUp":
//             case "ArrowDown":{
//                 if(!state.isOpen){
//                     setState(prev=>({...prev,isOpen:true}));
//                     break;
//                 }

//                 const newValue = state.hilightedIndex + (e.code === "ArrowDown" ? 1 : -1);
//                 if(newValue >= 0 && newValue < options.length){
//                     setState(prev=>({...prev,hilightedIndex:newValue}));
//                 }
//                 break;}
//             case "Escape":
//                 setState((prev) => ({...prev, isOpen:false}));
//             }

//     }

//     containerRef.current?.addEventListener("keydown", handler);

//     return () => {
//         containerRef.current?.removeEventListener("keydown",handler);
//     }
//   }, [state.isOpen, state.hilightedIndex, options])

//   return (
//     <div
//       ref={containerRef}
//       onClick={() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
//       onBlur={() => setState({ ...state, isOpen: false })}
//       tabIndex={0}
//       className={"relative w-full gap-2 p-3 border flex items-center bg-slate-100 dark:bg-gray-600 border-gray-500 outline-none focus:border-blue-500 rounded-md"}
//     >
//       <span className={"flex-grow flex gap-2 flex-wrap"}>
//         {multiple
//           ? value?.map((v, i) => (
//               <button
//                 key={i}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   SelectOption(v);
//                 }}
//                 className={"flex gap-2 items-center border border-gray-500 rounded-md p-1 px-3 outline-none bg-none hover:bg-blue-100 bg-slate-100 dark:bg-gray-700 dark:text-white dark:hover:bg-slate-500"}
//               >
//                 {v.name}
//                 <span className={"hover:text-red-300"}>&times;</span>
//               </button>
//             ))
//           : value?.name}
//       </span>

//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           clearOption();
//         }}
//         className={"hover:text-red-500"}
//       >
//         &times;
//       </button>

//       <div className={styles.divider}></div>
//         <div className={styles.caret}></div>
//         <ul className={`absolute top-cal rounded-md border border-gray-500  left-0 w-full bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-50 ${state.isOpen ? "block" : "hidden"} `}>
//           {options.map((option, index) => (
//             <li
//               onClick={(e) => {
//                 e.stopPropagation();
//                 SelectOption(option);
//                 setState({ ...state, isOpen: false });
//               }}
//               onMouseEnter={() =>
//                 setState((prev) => ({ ...prev, hilightedIndex: index }))
//               }
//               key={option.id}
//               className={`${styles.option} ${
//                 isOptionSelected(option) ? "bg-blue-200 dark:bg-slate-400" : ""
//               } ${index === state.hilightedIndex ? "bg-blue-300 dark:bg-slate-500 text-white" : ""} `}
//             >
//               {option.name}
//             </li>
//           ))}
//         </ul>
//     </div>
//   );
// };

// export default SelectTextField;
