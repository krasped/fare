import { FC } from "react";
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
  Divider,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5 } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { Statuses } from "../../../page-view";

// ==========================================================================
type AddUserFormProps = { data?: any };
// ==========================================================================

const GeneralInfo: FC<AddUserFormProps> = ({data}) => {
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
    name: data?.name || "",
    agency: "",
    parentAgency: "",
    role: "",
    // birthday: "",
    // company: data?.company || "",
    email: data?.email || "",
    phone: data?.phone || "",
  };

  const validationSchema = Yup.object({
    // name: Yup.string()
    //   .min(3, "Must be greater then 3 characters")
    //   .required("Full Name is Required!"),
    // agency: Yup.string().required("Agency is Required!"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is Required!"),
    // phone: Yup.number().min(9).required("Phone Number is required!"),
    // parentAgency: Yup.string(),
    // role: Yup.string(),
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

  return (
    <div>
      {/* <H5 fontSize={16} mb={4}>
        {data ? "Edit User" : "Add User"}
      </H5> */}
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
          <Grid pt={1} pb={1} container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                variant="outlined"
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.name && touched.name)}
                helperText={(touched.name && errors.name) as string}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="agency"
                label="Agency Name"
                variant="outlined"
                onBlur={handleBlur}
                value={values.agency}
                onChange={handleChange}
                error={Boolean(errors.agency && touched.agency)}
                helperText={touched.agency && errors.agency}
                inputProps={{ readOnly: true }}
              />
            </Grid>
{/* 
            <Grid item sm={6} xs={12}>
              <DatePicker
                label="Birthday"
                value={values.birthday}
                onChange={(date) => setFieldValue("birthday", date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="birthday"
                    onBlur={handleBlur}
                    error={Boolean(errors.birthday && touched.birthday)}
                    helperText={(touched.birthday && errors.birthday) as string}
                  />
                )}
              />
            </Grid> */}

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email && touched.email)}
                helperText={(touched.email && errors.email) as string}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                variant="outlined"
                onBlur={handleBlur}
                value={values.phone}
                onChange={handleChange}
                error={Boolean(errors.phone && touched.phone)}
                helperText={(touched.phone && errors.phone) as string}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="parentAgency"
                select
                fullWidth
                variant="outlined"
                label="Parent Agency"
                value={values.parentAgency}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.parentAgency && touched.parentAgency)}
                helperText={(touched.parentAgency && errors.parentAgency) as string}
                inputProps={{ readOnly: true }}
              >
                {ALL_PARENTS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
                
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                aria-readonly
                name="role"
                select
                fullWidth
                variant="outlined"
                label="Role"
                value={values.role}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.role && touched.role)}
                helperText={(touched.role && errors.role) as string}
                inputProps={{ readOnly: true }}
              >
                {ALL_ROLES.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Scrollbar>

        <Divider sx={{
          marginTop: 2
        }}/>
                <H5 fontSize={16} mt={3} mb={3}>
                  User Status
                </H5>
        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button color={
            data?.status === Statuses.active ? "error" : (data?.status === Statuses.pending ? "warning" : "success")
          } type="submit" size="small">
            {data.status === Statuses.active ? "Deactivate User" : "Activate User"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default GeneralInfo;
