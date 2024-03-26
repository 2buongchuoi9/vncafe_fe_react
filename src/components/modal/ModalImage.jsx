import { Button, Card, Descriptions, Image, Layout, Pagination, Space, Tabs, Upload, theme } from "antd"
import Modal from "antd/es/modal/Modal"
import { useContext, useEffect, useState } from "react"
import { MdOutlineCloudUpload } from "react-icons/md"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import propTypes from "prop-types"
import api from "~/api/api"
import classNames from "classnames"
import { MessageApiContext } from "~/app/provider/MessageApiProvider"

const getItems = (key, label, children) => ({ key, label, children })
const cl = classNames.bind()
function ModalImage({ isOpen = false, addText, onOk, onCancel }) {
    const { token } = theme.useToken()
    const { success, error } = useContext(MessageApiContext)
    const [totalElement, setTotalElement] = useState(0)
    const [selectImage, setSelectImage] = useState(null)
    const [images, setImages] = useState(null)
    const [query, setQuery] = useState({ page: 0, size: 10 })

    const fetchApi = async () => {
        const data = await api.get(`/file/image`, { params: query })
        const result = data.data
        setQuery((prev) => ({ ...prev, page: result.data.currentPage, size: result.data.pageSize }))
        setTotalElement(result.data.totalElement)
        setImages(result.data.content)
    }

    useEffect(() => {
        if (isOpen) {
            setSelectImage(null)
            fetchApi()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, query.page, query.size])
    if (!isOpen) return null

    const handelUploadImage = async (options) => {
        const { file, onSuccess, onError } = options
        const formData = new FormData()
        formData.append("file", file)

        try {
            await api.post("/file/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            onSuccess()
        } catch (err) {
            onError()
        }
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onOk={() => {
                    onOk(selectImage)
                }}
                onCancel={onCancel}
                footer={
                    selectImage ? (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <Space>
                                    đã chọn
                                    <Image src={selectImage.url} style={{ maxHeight: "32px" }} />
                                </Space>
                            </div>
                            <Button type="primary" style={{ backgroundColor: token.colorPrimaryHover }} onClick={() => onOk(selectImage)}>
                                {addText ? addText : "add image"}
                            </Button>
                        </div>
                    ) : null
                }
                width={1300}
                style={{
                    position: "sticky",
                }}
            >
                <Tabs
                    style={{ maxHeight: "600px", overflowY: "scroll" }}
                    type="card"
                    items={[
                        {
                            label: "chọn",
                            key: "1",
                            children: (
                                <Layout>
                                    <Content>
                                        <div style={{ overflowY: "scroll", height: "500px" }}>
                                            <ul className="flex justify-center flex-wrap ">
                                                {images &&
                                                    images.map((v) => (
                                                        <li
                                                            key={v.url}
                                                            onClick={() => setSelectImage(v)}
                                                            className={cl("m-3 border-2 rounded-lg overflow-hidden cursor-pointe drop-shadow-md", {
                                                                " border-blue-600 border-2": selectImage === v,
                                                            })}
                                                        >
                                                            <img className="w-40 h-40  object-cover" src={v?.url} alt=""></img>{" "}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        <Pagination
                                            pageSize={query.size}
                                            current={query.page + 1}
                                            total={totalElement}
                                            showTotal={(total) => `total: ${total} items`}
                                            showSizeChanger={true}
                                            onShowSizeChange={(current, pageSize) => setQuery((prev) => ({ ...prev, page: 0, size: pageSize }))}
                                            onChange={(page, pageSize) => setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize }))}
                                        />
                                    </Content>
                                    <Sider style={{ background: "transparent" }} width={"25%"}>
                                        <Card title="Chi tiết đính kèm">
                                            <Image src={selectImage?.url} style={{ minHeight: "80px" }} />
                                            <Descriptions
                                                layout="horizontal"
                                                column={1}
                                                items={[
                                                    getItems(1, "Create at: ", selectImage?.creatAt),
                                                    getItems(2, "Content type: ", selectImage?.contentType),
                                                    getItems(3, "Size: ", selectImage?.size + " kb"),
                                                ]}
                                            />
                                            {selectImage && (
                                                <div>
                                                    <Button
                                                        onClick={async () => {
                                                            await api.delete(`/file/image/${selectImage.id}`)
                                                            setSelectImage(null)
                                                            fetchApi()
                                                        }}
                                                        danger
                                                    >
                                                        delete
                                                    </Button>
                                                </div>
                                            )}
                                        </Card>
                                    </Sider>
                                </Layout>
                            ),
                        },
                        {
                            label: "thêm",
                            key: "2",
                            children: (
                                <div style={{ overflowY: "scroll", height: "500px" }}>
                                    <div>
                                        <Upload.Dragger
                                            // action={`${api.getUri}/file/upload-image`}
                                            customRequest={handelUploadImage}
                                            listType="picture"
                                            name="file"
                                            onChange={(info) => {
                                                const { status } = info.file
                                                if (status === "done") {
                                                    success(`${info.file.name} file uploaded successfully.`)
                                                    fetchApi()
                                                } else if (status === "error") {
                                                    error(`${info.file.name} file upload failed.`)
                                                }
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon flex justify-center">
                                                <MdOutlineCloudUpload size={50} />
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                                                files.
                                            </p>
                                        </Upload.Dragger>
                                    </div>
                                </div>
                            ),
                        },
                    ]}
                ></Tabs>
            </Modal>
        </div>
    )
}
ModalImage.propTypes = {
    selectedImage: propTypes.func,
    onOk: propTypes.func,
    onCancel: propTypes.func,
    addText: propTypes.string,
    isOpen: propTypes.bool,
    isMany: propTypes.bool,
}
export default ModalImage
