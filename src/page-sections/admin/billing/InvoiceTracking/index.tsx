import { Box, Card, Grid, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import HeadingArea from "./HeadingArea";
import SearchArea from "./SearchArea";
import { BigModal } from "@/components/modal";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import { Scrollbar } from "@/components/scrollbar";
import InvoiceTableHead from "./InvoiceTableHead";
import InvoiceTableRow from "./InvoiceTableRow";
import { SyntheticEvent, useState } from "react";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";

export enum Statuses {
  Paid = "paid",
  Unpaid = "unpaid",
  Overdue = "overdue",
}

export interface Invoice {
  id: string;
  agentName: string;
  amount: string;
  status: Statuses;
  date: string;
}

const invoices1: Invoice[] = [
  { id: "INV-001", agentName: "John Doe", amount: "1500", status: Statuses.Paid, date: "2024-02-20" },
  { id: "INV-002", agentName: "Jane Smith", amount: "2000", status: Statuses.Unpaid, date: "2024-02-18" },
  { id: "INV-003", agentName: "Mike Johnson", amount: "1000", status: Statuses.Overdue, date: "2024-02-15" },
];

const InvoiceTracking = () => {
  const [invoices, setInvoices] = useState([...invoices1]);
  const [compaignFilter, setCompaignFilter] = useState({ status: "", search: "", platform: "", createdBy: "" });
  // const [isEdit, setIsEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [data, setData] = useState<Invoice>();

  const {
    page,
    order,
    orderBy,
    selected,
    isSelected,
    rowsPerPage,
    handleSelectRow,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
  } = useMuiTable({ defaultOrderBy: "name" });

  const handleChangeFilter = (key: string, value: string) => {
    setCompaignFilter((state) => ({ ...state, [key]: value }));
  };

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    handleChangeFilter("subscriptionType", newValue);
  };

  // const handleEditInvoice = (user: Campaign) => {
  //   setData(user)
  //   setIsEdit(true);
  //   setOpenModal(true);
  // }
  const handleViewProfileDetails = (invoice: Invoice) => {
    setData(invoice)
    // setIsEdit(false);
    setOpenViewInvoice(true);
  }

  const filteredInvoices = stableSort(invoices, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (compaignFilter.status ? item.status.toLocaleLowerCase() == compaignFilter.status : true ) && 
        (compaignFilter.search ?
          item.agentName.toLowerCase().includes(compaignFilter.search.toLowerCase())
          : true )
      
      )
      // else if (userFilter.search)
      //   return item.name
      //     .toLowerCase()
      //     .includes(userFilter.search.toLowerCase());
      // else return true;
    },
  );

  const handleDeleteInvoice = (id: string) => {
    setInvoices((state) => state.filter((item) => item.id !== id));
  };

  const handleAllInvoiceDelete = () => {
    setInvoices((state) => state.filter((item) => !selected.includes(item.id)));
    handleSelectAllRows([])();
  };
  return (
      <Box mt={3}>
        <Card >
          <Box px={2} pt={2}>
            <HeadingArea/>

            <SearchArea
              filter={compaignFilter}
              handleChangeFilter={handleChangeFilter}
            />
            <BigModal open={openViewInvoice} handleClose={() => setOpenViewInvoice(false)}>
              {/* <ViewInvoice setOpenModal={setOpenViewInvoice} data={data}/> */}
            </BigModal>
          </Box>

          {/* TABLE ROW SELECTION HEADER  */}
          {/* {selected.length > 0 && (
            <TableToolbar
              selected={selected.length}
              handleDeleteRows={handleAllInvoiceDelete}
            />
          )} */}

          {/* TABLE HEAD & BODY ROWS */}
          <TableContainer>
            <Scrollbar autoHide={false}>
              <Table>
                <InvoiceTableHead
                  order={order}
                  orderBy={orderBy}
                  numSelected={selected.length}
                  rowCount={filteredInvoices.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllRows={handleSelectAllRows(
                    filteredInvoices.map((row) => row.id),
                  )}
                />

                <TableBody>
                  {filteredInvoices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((invoice) => (
                      <InvoiceTableRow
                        key={invoice.id}
                        invoice={invoice}
                        isSelected={isSelected(invoice.id)}
                        handleSelectRow={handleSelectRow}
                        // handleDeleteInvoice={handleDeleteInvoice}
                        // handleEditInvoice={handleEditInvoice}
                        handleViewProfileDetails={handleViewProfileDetails}
                      />
                    ))}

                  {filteredInvoices.length === 0 && <TableDataNotFound />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* PAGINATION SECTION */}
          <Box padding={1}>
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={filteredInvoices.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Box>
  );
};

export default InvoiceTracking;
