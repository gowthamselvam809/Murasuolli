import React, { useEffect, useState } from "react";
import { Row, Col, Card, Pagination, Button } from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import { useTable, useSortBy, usePagination, useGlobalFilter, useRowSelect } from "react-table";

import { GlobalFilter } from "./GlobalFilter";
import { Roles, RolesEnum, labels, reactTable } from "../../helper";
import { ReactTableSkeleton, isEmptyArray } from "../../utils";
import { deleteUser, getAllUsers } from "../../api/apiRegister";
import { AddUser, EditUser } from "../users";
import { LargeModal } from "./";

const Table = (props) => {
  const { columns, data, getUsersList } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    globalFilter,
    setGlobalFilter,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const [addUser, setAddUser] = useState(false);

  return (
    <>
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          {reactTable.Show}
          <select
            className="form-control w-auto mx-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          Entries
        </Col>

        <Col className="d-flex justify-content-end">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          &nbsp;
          <Button
            variant="success"
            className="btn-sm btn-round has-ripple ml-2"
            onClick={() => {
              setAddUser(true);
            }}
          >
            + {labels.ADD_USER}
          </Button>
        </Col>
      </Row>

      <BTable striped bordered hover responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                  {column.render(reactTable.Header)}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="feather icon-arrow-down text-muted float-right" />
                      ) : (
                        <span className="feather icon-arrow-up text-muted float-right" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <td {...cell.getCellProps()} key={j}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>

      <Row className="justify-content-between">
        <Col>
          <span className="d-flex align-items-center">
            {reactTable.Page}{" "}
            <strong>
              {" "}
              {pageIndex + 1} of {pageOptions.length}{" "}
            </strong>{" "}
            | {reactTable.GoToPage}{" "}
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              className="form-control ml-2"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
        </Col>
        <Col>
          <Pagination className="justify-content-end">
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
        </Col>
      </Row>

      <LargeModal title={labels.ADD_USER} showModal={addUser} setShowModal={setAddUser}>
        <AddUser getUsersList={getUsersList} showModal={addUser} setShowModal={setAddUser}/>
      </LargeModal>
    </>
  );
}

const UsersList = () => {
  const columns = React.useMemo(() =>
    [
      {
        Header: labels.INDEX,
        accessor: labels.INDEX_ACCESSOR,
      },
      {
        Header: labels.FIRST_NAME,
        accessor: labels.FIRST_NAME_ACCESSOR,
      },
      {
        Header: labels.LAST_NAME,
        accessor: labels.LAST_NAME_ACCESSOR,
      },
      {
        Header: labels.EMAIL,
        accessor: labels.EMAIL_ACCESSOR,
      },
      {
        Header: labels.CITY,
        accessor: labels.CITY_ACCESSOR,
      },
      {
        Header: labels.PHONE,
        accessor: labels.PHONE_ACCESSOR,
      },
      {
        Header: labels.ROLE,
        accessor: labels.ROLE_ACCESSOR,
      },
      {
        Header: labels.OPTIONS,
        accessor: labels.OPTIONS_ACCSSOR,
      },
    ], []
  );

  const [usersList, setUserList] = useState([]);
  const [editUserId, setEditUserId] = useState("");
  const [editUserModal, setEditUserModal] = useState(false);

  const editUserfn = (index) => {
    setEditUserId(index);
    setEditUserModal(true);
  }

  const deleteUserfn = async (id) => {
    const response = await deleteUser({ id });
    if (response) {
      getUsersList();
    }
  }

  const getRole = (type) => {
    switch (type) {
    case RolesEnum.User:
      return Roles.user
    case RolesEnum.Admin:
      return Roles.admin
    case RolesEnum.SuperAdmin:
      return Roles.superAdmin
    default:
      break;
    }
  }

  const getUsersList = async () => {
    const userData = await getAllUsers();

    let finalDataArray = [];
    for (let index = 0; index < userData.length; index++) {
      userData[index].index_no = index + 1;
      userData[index].type = await getRole(userData[index].type);
      userData[index][reactTable.actions] = (
        <>
          <Button
            size="sm"
            className="btn btn-icon btn-rounded btn-primary"
            onClick={() => { editUserfn(userData[index]) }}
          >
            {labels.EDIT}
          </Button>
          &nbsp;
          <Button
            size="sm"
            className="btn btn-icon btn-rounded btn-danger"
            onClick={() =>
              deleteUserfn(userData[index].id)
            }
          >
            {labels.DELETE}
          </Button>
          &nbsp;
        </>
      );
      finalDataArray.push(userData[index]);
    }
    setUserList(finalDataArray);
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5" className='d-flex justify-content-between'>
                <h5>{labels.USERS}</h5>                            </Card.Title>
            </Card.Header>
            <Card.Body>
              {!isEmptyArray(usersList) ? <Table getUsersList={getUsersList} columns={columns} data={usersList} /> : <ReactTableSkeleton />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <LargeModal title={labels.EDIT_USER} showModal={editUserModal} setShowModal={setEditUserModal}>
        <EditUser getUsersList={getUsersList} userId={editUserId} showModal={editUserModal} setShowModal={setEditUserModal} />
      </LargeModal>
    </React.Fragment>
  );
};
export { UsersList };
