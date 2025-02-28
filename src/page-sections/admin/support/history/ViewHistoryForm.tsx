import { FC, ReactNode, useState } from "react";
import {
  Grid,
  Stack,
  Theme,
  Button,
  Avatar,
  TextField,
  IconButton,
  useMediaQuery,
  MenuItem,
  styled,
  Divider,
} from "@mui/material";
import { Modal } from "@/components/modal";
import { CameraAlt, Edit } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5, Paragraph, Span } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { useSnackbar } from "@/contexts/snackbarContext";
import { FlexBetween } from "@/components/flexbox";
import { Ticket } from ".";

// ==========================================================================
type RefundFormProps = { handleClose: () => void; data?: Ticket };
// ==========================================================================

const ViewTicketForm: FC<RefundFormProps> = ({ handleClose, data }) => {
  const showSnackbar = useSnackbar();
  const [openEditHeadlines, setOpenEditHeadlines] = useState(false);
  const handleCloseModal = () => {setOpenEditHeadlines(false)}
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const ALL_ROLES = [
      { id: 1, name: "Admin", value: Roles.admin },
      { id: 2, name: "Agent", value: Roles.agent },
      { id: 3, name: "sub Agent", value: Roles.subAgent },
      { id: 4, name: "Manager", value: Roles.manager },
      { id: 5, name: "Marketing", value: Roles.marketing },
    ];
  const ALL_PARENTS = [
      { id: 1, name: "Premier Group", value: "Premier Group" },
      { id: 2, name: "Elit Realty", value: "Elit Realty" },
    ];

  // const initialValues = {
  //   headline: data?.headline || "",
  //   description: data?.description || "",
  //   targetDestination: data?.targetDestination || "",
  //   startDate: data?.startDate || "",
  //   endDate: data?.endDate || "",
  //   displayPlatforms: data?.displayPlatforms || "",
  //   totalAds: data?.totalAds || "",
  // };

  const validationSchema = Yup.object({
    // name: Yup.string()
    //   .min(3, "Must be greater then 3 characters")
    //   .required("Full Name is Required!"),
    // agency: Yup.string().required("Agency is Required!"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is Required!"),
    // // birthday: Yup.date().required("Date of Birth is Required!"),
    // phone: Yup.number().min(9).required("Phone Number is required!"),
    // parentAgency: Yup.string(),
    // role: Yup.string(),
    // company: Yup.string().required("Company is Required!"),
  });

  // const {
  //   values,
  //   errors,
  //   handleSubmit,
  //   handleChange,
  //   handleBlur,
  //   touched,
  //   setFieldValue,
  // } = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: (values) => {handleClose()},
  // });

  const StyledBox = styled("div")(({ theme }) => ({
    padding: 24,
    height: "100%",
    borderRadius: 8,
  }));

  return (
    <div>
      <H5 fontSize={16}>
        {data ? "Ticket History - " + data?.id : "Ticket History"}
      </H5>
      {/* <form onSubmit={handleSubmit}> */}
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
          {/* <Stack direction="row" justifyContent="center" mb={6}>
            <AvatarBadge
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    style={{ display: "none" }}
                  />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt
                      sx={{ fontSize: 16, color: "background.paper" }}
                    />
                  </IconButton>
                </label>
              }
            >
              <Avatar
                src={data?.avatar || "/static/avatar/001-man.svg"}
                sx={{ width: 80, height: 80, backgroundColor: "grey.100" }}
              />
            </AvatarBadge>
          </Stack> */}

          <Grid spacing={3}>
            {/* <Grid item sm={6} xs={12}> */}
            <StyledBox>

            <Stack spacing={2}>
                <H5 fontSize={16}>
                  {data?.subject}
                </H5>
                <FlexBetween>
                  <ListItem text="Category:" description={data?.category} />
                  <ListItem text="Status:" description={data?.status} />
                   
                </FlexBetween>
                <Divider/>
                <H5 fontSize={16}>
                  Description
                </H5>
                <ListItem
                  text=""
                  description={data?.description || "No description provided"}
                />
                <Divider/>
                <H5 fontSize={16}>
                  Resolution Details
                </H5>
                <ListItem
                  text="Resolution Status"
                  description={data?.resolutionStatus}
                />
                <ListItem
                  text="Resolved By"
                  description={data?.resolvedBy}
                />
                <ListItem
                  text="Resolution Date"
                  description={data?.closedAt}
                />
                <ListItem
                  text=""
                  description={data?.resolutionDetails}
                />
               
            </Stack>
            </StyledBox>
              
          </Grid>
        </Scrollbar>
      {/* </form> */}
    </div>
  );
};

function ListItem({
  text,
  description,
}: {
  text: string;
  description: string | ReactNode;
}) {
  return (
    <Paragraph color="text.secondary">
      {text} <br />
      <Span fontWeight={500} color="text.primary">
        {description}
      </Span>
    </Paragraph>
  );
}

export default ViewTicketForm;
