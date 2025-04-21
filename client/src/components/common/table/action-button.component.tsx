// import { FaTrash, FaPen } from "react-icons/fa6"
// import { NavLink } from "react-router-dom"
// import Swal from "sweetalert2"
// const TableActionButton = ({
//   showDelete = true,
//   showEdit = true,
//   rowId,
//   editUrl="",
//   deleteAction=()=>{}
// }: {
//   showDelete?: Boolean|true,
//   showEdit?: Boolean | true
//    rowId:string,
//    editUrl:string,
//    deleteAction?:Function
// }) => {
//   const showDeletePanel=()=>{
//     try{

//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       }).then((result) => {
//         if (result.isConfirmed) {
//         deleteAction(rowId)
//         }
//       });

//     }
//     catch(exception){
// console.log(exception)
//     }
//   }
//   return <>
//     {
//       showEdit ? <>
//         <NavLink
//           to={editUrl}
//           className="inline-block rounded-full bg-indigo-600 px-2  py-2 text-xs font-medium text-white hover:bg-indigo-700"
//         >
         
//           <FaPen />
//         </NavLink>

//       </> : <></>
//     }

//     {
//       showDelete ? <>
//         <a
//           href="#"
//           onClick={(e)=>{
//             e.preventDefault()
//             showDeletePanel()
//           }}
//           className="inline-block rounded-full bg-indigo-600 px-2  py-2 text-xs font-medium text-white hover:bg-indigo-700"
//         >
       
//           <FaTrash />
//         </a>

//       </> : <></>
//     }

//   </>
// }


// export default TableActionButton


import { FaTrash, FaPen } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

interface TableActionButtonProps {
  showDelete?: boolean;
  showEdit?: boolean;
  rowId: string;
  editUrl?: string;
  deleteAction?: (id: string) => Promise<void>;
}

const TableActionButton: React.FC<TableActionButtonProps> = ({
  showDelete = true,
  showEdit = true,
  rowId,
  editUrl = "",
  deleteAction = async () => {},
}) => {
  const showDeletePanel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAction(rowId);
      }
    });
  };

  return (
    <>
      {showEdit && (
        <NavLink
          to={editUrl}
          className="inline-block rounded-full bg-indigo-600 px-2 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          <FaPen />
        </NavLink>
      )}

      {showDelete && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            showDeletePanel();
          }}
          className="inline-block rounded-full bg-indigo-600 px-2 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          <FaTrash />
        </a>
      )}
    </>
  );
};

export default TableActionButton;
