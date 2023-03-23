// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import Table from "react-bootstrap/Table";

// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// function UserList() {
//   let myUsersList;
//   const navigatesTo = useNavigate();
//   const [userList, setUserList] = useState([]);

//   fetch("http://localhost:3001/myusers")
//     .then((res) => res.json())
//     .then((res) => {
//       setUserList([...res]);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   function changetoLogin() {
//     navigatesTo("/");
//     localStorage.clear();
//   }

//   function BacktoDashboard() {
//     navigatesTo("/layout");
//   }

//   function removeRow(id) {
//     let filterAfterDelete = userList.filter((user) => {
//       return user._id !== id;
//     });
//     setUserList([...filterAfterDelete]);
//     console.log("deleted");
//   }

//   return (
//     <>
//       <Container className="ms-auto">
//         <Button variant="primary" className="m-3" onClick={BacktoDashboard}>
//           Back TO DashBoard
//         </Button>
//         <Button variant="primary" className="m-3" onClick={changetoLogin}>
//           Logout
//         </Button>
//       </Container>

//       <Container className="mt-4">
//         <Row>
//           <Col>
//             <Table striped className="text-center">
//               <thead className="bg-info">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>password</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userList.map((each, index) => {
//                   let indexofAt = each.email.indexOf("@");
//                   //  console.log(indexofAt, each.email);
//                   let UserName = each.email.slice(0, indexofAt);

//                   return (
//                     <tr>
//                       <td>{index + 1}</td>
//                       <td>{UserName}</td>
//                       <td>{each.email}</td>
//                       <td>********</td>
//                       <td>
//                         {
//                           <DeleteOutlinedIcon
//                             onClick={() => {
//                               removeRow(each._id);
//                             }}
//                           />
//                         }
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default UserList;

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import axios from "axios";
import { faSort, faT, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmModel from "./ConfirmModel";
import { useNavigate } from "react-router-dom";

import UpdateUser from "./UpdateUser";

function Index() {
  const [userList, setUserList] = useState([]);
  const [errorcase, setErrorCase] = useState("");
  const [order, setOrder] = useState("asc");
  const [original, setOriginal] = useState([]);
  const [verifyDelete, setVerifyDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const navigatesTo = useNavigate();

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    const url = "http://localhost:3001/todos";

    axios
      .get(url)
      .then((response) => {
        let users = [];

        if (response.data && response.data.length) {
          users = response.data;
          setOriginal(users);
          setUserList(users);
          console.log(users);
        }
      })
      .catch((errors) => {
        setErrorCase(errors);
        // console.log(`Error : ${errorcase}`);
      });
  };

  // const sorting = (col) => {
  //   if (order === "asc") {
  //     const sorted = [...userList].sort((a, b) =>
  //       // const sorted= {...userList,["results"]:userList.results.sort((a,b)=>
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  //     );
  //     setUserList(sorted);
  //     setOrder("dsc");
  //   }
  //   if (order === "dsc") {
  //     const sorted = [...userList].sort((a, b) =>
  //       //   const sorted= {...userList,["result"]: userList.results.sort((a,b)=>
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  //     );
  //     setUserList(sorted);
  //     setOrder("asc");
  //   }
  // };

  // delete functonality
  function deleteUser(id) {
    // let verify = window.confirm(`click on OK to delete user with id: ${id} `);
    // console.log(verify);

    // if (verify) {
    //   axios
    //     .delete("http://localhost:3001/myusers/" + id)
    //     .then((res) => {
    //       console.log(res);
    //       window.location.reload();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    setVerifyDelete(true);
    setDeleteId(id);
  }

  function onVerifyClose(result) {
    if (!result) {
      setVerifyDelete(false);
      return;
    } else {
      axios
        .delete("http://localhost:3001/todos/" + deleteId)
        .then((res) => {
          console.log(res);
          setVerifyDelete(false);
          getAllUser();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // ///// edit user

  function editUser(id) {
    // alert(`user clicked on" ${id} "  to edit`);
    // <UpdateUser id={id} />;
    // navigatesTo("/dashboard/" + id);
  }

  // search functionality

  function onSearch(event) {
    let text = event.target.value;

    if (!text) {
      setUserList(original);
      //window.location.reload();
    } else {
      let filterd = userList.filter((user) => {
        return user.email.toLowerCase().includes(text.toLowerCase());
      });
      setUserList(filterd);
    }
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <input placeholder="Enter Email" fontSize="small" onChange={onSearch} />

      <div className="table-responsive">
        <Table
          className="text-center"
          sx={{ minWidth: 500, marginTop: "10px" }}
          aria-label="custom pagination table"
        >
          <TableHead className="bg-info">
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell onClick={() => sorting("email")}>
                UserName <FontAwesomeIcon icon={faSort} className="ms-2" />
              </TableCell>
              <TableCell align="left" onClick={() => sorting("email")}>
                email
                <FontAwesomeIcon icon={faSort} className="ms-2" />
              </TableCell>
              <TableCell align="left">password</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? userList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : userList
            ).map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell align="left">{user.email.slice(0, 5)}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">***********</TableCell>
                <TableCell align="left">
                  <FontAwesomeIcon
                    icon={faTrash}
                    fontSize="small"
                    className="me-3"
                    onClick={() => deleteUser(user._id)}
                  />
                  <EditIcon
                    fontSize="small"
                    className="ms-3"
                    onClick={() => editUser(user._id)}
                  />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>

        {verifyDelete && <ConfirmModel onClose={onVerifyClose} />}
      </div>
    </>
  );
}

export default Index;
