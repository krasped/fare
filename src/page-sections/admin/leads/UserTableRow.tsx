import { MouseEvent, useState } from "react";
import { Avatar, Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, PageviewOutlined, Edit } from "@mui/icons-material";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { Campaign, Statuses } from "./page-view";
import { ConfirmationDialog } from "@/components/dialogs";
import { StatusBadge } from "@/components/status-badge";

// ==============================================================
interface UserRowProps {
  user: any;
  isSelected: boolean;
  handleViewProfileDetailsUser: (user: Campaign) => void;
  // handleEditUser: (user: Campaign) => void;
  handleDeleteUser: (id: string) => void;
  handleSelectRow: (_: MouseEvent, name: string) => void;
}
// ==============================================================

const UserTableRow = (props: UserRowProps) => {
  const { user, isSelected, handleSelectRow, handleDeleteUser, handleViewProfileDetailsUser } = props;

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);


  const handleConfirm = (isConfirm: boolean) =>{
    setIsOpen(false)
    if(isConfirm) handleDeleteUser(user.id);
  }

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
          <Avatar src={user.avatar} alt={user.name} variant="rounded" />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {user.name}
            </Paragraph>

            <Paragraph fontSize={13}>#{user.id.substring(0, 11)}</Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      {/* <TableCell padding="normal">{user.email}</TableCell> */}

      <TableCell padding="normal">{user.createdBy}</TableCell>

      <TableCell padding="normal">{user.platform}</TableCell>

      <TableCell padding="normal">
        <StatusBadge type={user.status === Statuses.active ? "success" : (user.status === Statuses.pending ? "warning" : "error")}>
          {user.status}
        </StatusBadge>
      </TableCell>

      <TableCell padding="normal">{user.createdAt}</TableCell>

      <TableCell padding="normal">
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
              handleViewProfileDetailsUser(user);
            }}
          />
          {/* <TableMoreMenuItem
            Icon={Edit}
            title="Edit"
            handleClick={() => {
              handleCloseOpenMenu();
              handleEditUser(user);
            }}
          /> */}
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title="Delete"
            handleClick={() => {
              handleCloseOpenMenu();
              setIsOpen(true)
            }}
          />
        </TableMoreMenu>
      </TableCell>
          <ConfirmationDialog title={"Delete Campaign"} 
            description={"Are you sure you want to delete this campaign? This action cannot be undone."} 
            confirmTitle={"Delete"} 
            cancelTitle={"Cancel"} 
            isOpen={isOpen}
            handleConfirm={handleConfirm} />
    </TableRow>
  );
};

export default UserTableRow;
