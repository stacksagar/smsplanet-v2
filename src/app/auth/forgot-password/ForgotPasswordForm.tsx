"use client";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import Link from "next/link";

import { useFormik } from "formik";
import FIcon from "@/common/FIcon";
import MuiButton from "@/common/MaterialUi/MuiButton";
import AuthPageLayout from "@/components/AuthPageLayout";
import { all_fields_required } from "@/validations/formik_validations";
import axios from "axios";
import toast from "@/lib/toast";
import error_message from "@/lib/error_message";

export default function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validate: all_fields_required,

    onSubmit: async (values) => {
      try {
        await axios.post(`/api/auth/reset-password`, {
          email: values.email,
        });
        toast({
          message: "Reset email sent!",
          type: "success",
        });
      } catch (error) {
        toast({
          message: error_message(error),
          type: "warning",
        });
      }
    },
  });

  return (
    <AuthPageLayout
      text={<p className="text-xl"> Request for your new password! </p>}
    >
      <form onSubmit={formik.handleSubmit} className="h-fit w-full space-y-6">
        <h2 className="flex items-center gap-x-2 pb-4 text-center text-2xl font-semibold text-blue-500">
          <FIcon icon="envelope" />
          <span> Reset Your Password </span>
        </h2>

        <MuiTextField
          required={true}
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          touched={formik.touched.email}
          error={formik.errors.email}
        />

        <div className="w-full sm:w-fit">
          <MuiButton loading={formik.isSubmitting} type="submit">
            Reset Password
          </MuiButton>
        </div>

        {/* Signup Message */}
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          <span className="mr-1"> Wanna signin? </span>
          <a
            href="/auth/signin"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            Signin from here
          </a>
        </p>
      </form>
    </AuthPageLayout>
  );
}
