import { MouseEvent, useState } from "react";
import { Avatar, Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, PageviewOutlined, Edit } from "@mui/icons-material";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { Invoice, Statuses } from "./index";
import { ConfirmationDialog } from "@/components/dialogs";

// ==============================================================
interface InvoiceRowProps {
  invoice: Invoice;
  isSelected: boolean;
  handleViewProfileDetails: (invoice: Invoice) => void;
  // handleEditUser: (user: Campaign) => void;
  // handleDeleteUser: (id: string) => void;
  handleSelectRow: (_: MouseEvent, name: string) => void;
}
// ==============================================================

const InvoiceTableRow = (props: InvoiceRowProps) => {
  const { invoice, handleViewProfileDetails } = props;

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, user.id)}
        />
      </TableCell> */}

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {invoice.agentName}
            </Paragraph>

            <Paragraph fontSize={13}>#{invoice.id.substring(0, 11)}</Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      {/* <TableCell padding="normal">{user.email}</TableCell> */}

      <TableCell padding="normal">{invoice.amount}</TableCell>

      <TableCell padding="normal">
        <Chip
          size="small"
          label={invoice.status}
          color={invoice.status === Statuses.Paid ? "success" : (invoice.status === Statuses.Overdue ? "warning" : "error")}
        />
      </TableCell>

      <TableCell padding="normal">{invoice.date}</TableCell>

      {/* <TableCell padding="normal">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          <TableMoreMenuItem
            Icon={PageviewOutlined}
            title="View Details"
            handleClick={() => {
              handleCloseOpenMenu();
              handleViewProfileDetails(invoice);
            }}
          />
        </TableMoreMenu>
      </TableCell> */}
    </TableRow>
  );
};

export default InvoiceTableRow;
