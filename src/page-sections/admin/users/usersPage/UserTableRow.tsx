import { MouseEvent, useState } from "react";
import { Avatar, Checkbox, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, PageviewOutlined, Edit } from "@mui/icons-material";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { Statuses, User } from ".";
import { StatusBadge } from "@/components/status-badge";
import { DocumentStatuses } from "../documentsPage";
import { StrNum } from "@/models/common";

// ==============================================================
interface UserRowProps {
  user: User;
  isSelected: boolean;
  handleViewProfileDetailsUser: (user: User) => void;
  handleEditUser: (user: User) => void;
  handleDeleteUser: (id: StrNum) => void;
  handleSelectRow: (_: MouseEvent, name: string) => void;
}
// ==============================================================

const UserTableRow = (props: UserRowProps) => {
  const { user, isSelected, handleSelectRow, handleDeleteUser, handleEditUser, handleViewProfileDetailsUser } = props;

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
          onClick={(event) => handleSelectRow(event, user.user_id.toString())}
        />
      </TableCell> */}

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar src={user.avatar} alt={user.username} variant="rounded" />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {user.username}
            </Paragraph>

            <Paragraph fontSize={13}>#{user.user_id.toString().substring(0, 11)}</Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{user.email}</TableCell>

      <TableCell padding="normal">{user.role}</TableCell>

      <TableCell padding="normal">{user.agency_name}</TableCell>

      <TableCell padding="normal">{user.plan}</TableCell>

      <TableCell padding="normal">
        <StatusBadge type={user.user_status === Statuses.active ? "success" : (user.user_status === Statuses.pending ? "warning" : "error")}>
          {user.user_status}
        </StatusBadge>
      </TableCell>
      <TableCell padding="normal">
              {/* <StatusBadge type={user.documentStatus === DocumentStatuses.approved ? "success" : ((user.documentStatus === DocumentStatuses.waiting || user.documentStatus === DocumentStatuses.missing) ? "warning" : "error")}>
                {user.documentStatus}
              </StatusBadge> */}
      </TableCell>

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
          <TableMoreMenuItem
            Icon={Edit}
            title="Edit"
            handleClick={() => {
              handleCloseOpenMenu();
              handleEditUser(user);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title="Delete"
            handleClick={() => {
              handleCloseOpenMenu();
              handleDeleteUser(user.user_id);
            }}
          />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
