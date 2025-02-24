import { FC, ReactNode } from "react";
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
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5, Paragraph, Span } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { Refund } from ".";

// ==========================================================================
type RefundFormProps = { handleCancel: () => void; data?: Refund };
// ==========================================================================

const RefundForm: FC<RefundFormProps> = ({ handleCancel, data }) => {
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

  const initialValues = {
    agentName: data?.agentName || "",
    amount: data?.amount || "",
    orderId: data?.orderId || "",
  };

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

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  const StyledBox = styled("div")(({ theme }) => ({
    padding: 24,
    height: "100%",
    borderRadius: 8,
  }));

  return (
    <div>
      <H5 fontSize={16}>
        {data ? "Refund Details - " + data.id : "Refund Details"}
      </H5>
      <form onSubmit={handleSubmit}>
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

                <ListItem text="Agent Information:" description={values.agentName} />
                <ListItem
                  text="Amount:"
                  description={"$"+values.amount}
                />
                <ListItem
                  text="Order Id"
                  description={values.orderId}
                />
            </Stack>
            </StyledBox>
              {/* <TextField
                fullWidth
                name="agentName"
                label="Agent Information"
                variant="outlined"
                onBlur={handleBlur}
                value={values.agentName}
                onChange={handleChange}
                error={Boolean(errors.agentName && touched.agentName)}
                helperText={(touched.agentName && errors.agentName) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="amount"
                label="Amount"
                variant="outlined"
                // onBlur={handleBlur}
                value={"$"+values.amount}
                // onChange={handleChange}
                // error={Boolean(errors.amount && touched.amount)}
                // helperText={touched.amount && errors.amount}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="orderId"
                label="Order Id"
                variant="outlined"
                // onBlur={handleBlur}
                value={values.orderId}
                // onChange={handleChange}
                // error={Boolean(errors.orderId && touched.orderId)}
                // helperText={(touched.orderId && errors.orderId) as string}
              />
            </Grid> */}
          </Grid>
        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button color="success" onClick={() =>{
            // OpenSnackbar()
          }} type="submit" size="small">
            Approve
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleCancel}
          >
            Reject
          </Button>
        </Stack>
      </form>
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

export default RefundForm;
