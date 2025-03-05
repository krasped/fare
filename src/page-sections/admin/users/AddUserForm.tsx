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
  Switch,
  styled,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5, Paragraph } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { nanoid } from "nanoid";


const SwitchWrapper = styled(FlexBox)({
  width: "100%",
  marginTop: 10,
});

// ==========================================================================
type AddUserFormProps = { handleCancel: () => void; data?: any };
// ==========================================================================

const AddUserForm: FC<AddUserFormProps> = ({ handleCancel, data }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const ALL_ROLES = [
      { id: 1, name: "Admin", value: Roles.admin },
      { id: 3, name: "sub Agent", value: Roles.subAgent },
      { id: 4, name: "Manager", value: Roles.manager },
      { id: 5, name: "Marketing", value: Roles.marketing },
      { id: 6, name: "Agent Owner", value: Roles.agentOwner },
    ];
  const ALL_PARENTS = [
      { id: 1, name: "Premier Group", value: "Premier Group" },
      { id: 2, name: "Elit Realty", value: "Elit Realty" },
    ];
  const ALL_PLANS = [
      { id: 1, name: "Free Trial", value: "Free Trial" },
      { id: 2, name: "Basic", value: "Basic" },
      { id: 2, name: "Standard", value: "Standard" },
      { id: 2, name: "Premium", value: "Premium" },
    ];
  const ALL_TIERS = [
      { id: 1, name: "1", value: "1" },
      { id: 2, name: "2", value: "2" },
      { id: 2, name: "3", value: "3" },
      { id: 2, name: "tripin-manager", value: "tripin-manager" },
      { id: 2, name: "admin", value: "admin" },
      { id: 2, name: "worker", value: "worker" },
    ];

  const initialValues = {
    name: data?.name || "",
    agency: data?.agency,
    parentAgency: "",
    role: "",
    isNewAgency: false, //
    email: data?.email || "",
    phone: data?.phone || "",
    plan: data?.plan || "",
    tier: "",
    accountManager: "",
    password: nanoid(),
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be greater then 3 characters")
      .required("Full Name is Required!"),
    agency: Yup.string().required("Agency is Required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required!"),
    // birthday: Yup.date().required("Date of Birth is Required!"),
    phone: Yup.number().min(9).required("Phone Number is required!"),
    parentAgency: Yup.string(),
    role: Yup.string(),
    plan: Yup.string(),
    tier: Yup.string(),
    accountManager: Yup.string(),
    password: Yup.string(),
    isNewAgency: Yup.boolean(),
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

  const changeIsNew = (value: boolean) => {
    if(value){
      setFieldValue("role", Roles.agentOwner)
      setFieldValue("parentAgency", "")
    }
    setFieldValue("isNewAgency", value)
  }

  return (
    <div>
      <H5 fontSize={16} mb={4}>
        {data ? "Edit User" : "Add User"}
      </H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
          <Stack direction="row" justifyContent="center" mb={6}>
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
          </Stack>

          <Grid container spacing={3} pb={2}>
            <Grid item sm={12} xs={12}>
              <SwitchWrapper>
                <Paragraph pt={1} display="block" fontWeight={500}>
                  New agency?
                </Paragraph>

                <Switch checked={values?.isNewAgency} onChange={(e, checked)=>changeIsNew(checked)} />
              </SwitchWrapper>
            </Grid>
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
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="parentAgency"
                select
                fullWidth
                disabled={values.isNewAgency}
                variant="outlined"
                label="Parent Agency"
                value={values.parentAgency}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.parentAgency && touched.parentAgency)}
                helperText={(touched.parentAgency && errors.parentAgency) as string}
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
              >
                {ALL_ROLES.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="plan"
                select
                fullWidth
                variant="outlined"
                label="Plan"
                value={values.plan}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.plan && touched.plan)}
                helperText={(touched.plan && errors.plan) as string}
              >
                {ALL_PLANS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                name="tier"
                select
                fullWidth
                variant="outlined"
                label="Tier"
                value={values.tier}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.tier && touched.tier)}
                helperText={(touched.tier && errors.tier) as string}
              >
                {ALL_TIERS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          <Grid item sm={6} xs={12}>
              <TextField
                name="accountManager"
                select
                fullWidth
                variant="outlined"
                label="Account Manager"
                value={values.accountManager}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.accountManager && touched.accountManager)}
                helperText={(touched.accountManager && errors.accountManager) as string}
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
                fullWidth
                name="password"
                // type="email"
                label="Password"
                variant="outlined"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                error={Boolean(errors.password && touched.password)}
                helperText={(touched.password && errors.password) as string}
              />
            </Grid>
          </Grid>

        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit">
            {data? "Save": "Create"}
          </Button>

          {/* <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button> */}
        </Stack>
      </form>
    </div>
  );
};

export default AddUserForm;
