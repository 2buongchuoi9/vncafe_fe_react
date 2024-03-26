import { Button, Form, Input } from "antd"
import propTypes from "prop-types"
import { Formik } from "formik"
import * as Yup from "yup"
import SocialAuth from "./SocialAuth"
const LoginForm = ({ onSubmit }) => {
    const initialValues = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
            .required("Required"),
        password: Yup.string().min(3, "Minium 3 characters").required("Required"),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, setSubmitting) => await onSubmit(values, setSubmitting)}
        >
            {(formikProps) => {
                const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formikProps
                return (
                    <div className="w-[100%] flex justify-center items-center divide-x divide-solid divide-gray-300 space-x-5 mb-5">
                        <div className="w-[60%]">
                            <Form onFinish={handleSubmit}>
                                <div className="mb-10 flex justify-center text-base">Đăng nhập với email</div>
                                <div className="space-y-5">
                                    <Form.Item
                                        name="email"
                                        validateStatus={errors.email && touched?.email ? "error" : ""}
                                        help={errors.email && touched?.email ? errors.email : ""}
                                    >
                                        <Input
                                            size="large"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        validateStatus={errors.password && touched?.password ? "error" : ""}
                                        help={errors.password && touched?.password ? errors.password : ""}
                                    >
                                        <Input.Password
                                            size="large"
                                            name="password"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input.Password>
                                    </Form.Item>
                                    <Button
                                        htmlType="submit"
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        typeof="submit"
                                        size="large"
                                        type="primary"
                                        block
                                        className="text-white-400  bg-blue-400"
                                    >
                                        Đăng nhập
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="pl-5 w-[40%]">
                            <SocialAuth />
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}
LoginForm.propTypes = { onLoginSuccess: propTypes.func, onSubmit: propTypes.func }
export default LoginForm
