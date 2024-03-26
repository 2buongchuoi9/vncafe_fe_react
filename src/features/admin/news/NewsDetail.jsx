import { Affix, Avatar, Button, Card, Cascader, Descriptions, Input, Layout, Switch, Tooltip, theme } from "antd"
import TextArea from "antd/es/input/TextArea"
import Sider from "antd/es/layout/Sider"
import { Content } from "antd/es/layout/layout"
import JoditEditor, { Jodit } from "jodit-react"
import propTypes from "prop-types"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import api from "~/api/api"
import { cateSelect } from "~/app/slice/Category.slice"
import Tags from "./Tags"
import ModalImage from "~/components/modal/ModalImage"
import { MessageApiContext } from "~/app/provider/MessageApiProvider"
import { getCates, getParentCateId } from "~/utils"

const initnew = {
    id: null,
    name: null,
    content: null,
    description: null,
    image: null,
    isPublished: false,
    category: null,
    categoryId: null,
    tags: null,
    createAt: null,
    user: null,
}

const NewsDetail = ({ isAdd = false }) => {
    const { id } = useParams()
    const [images, setImages] = useState([])
    const editor = useRef()
    const cates = useSelector(cateSelect.category)
    const { token } = theme.useToken()
    const [openImage, setOpenImage] = useState(false)
    const [news, setNews] = useState(initnew)
    const { success, error } = useContext(MessageApiContext)
    const navigate = useNavigate()

    console.log("news", news)

    useEffect(() => {
        const fetch = async () => {
            if (!isAdd && id !== null && id !== "") {
                const a = await api.get(`/news/${id}`)
                setNews({ ...a.data.data, categoryId: a.data.data.category?.id, image: a.data.data.image?.url })
            }
        }
        if (!isAdd) fetch()
    }, [isAdd, id])

    const handleOnsubmit = async () => {
        if (!isAdd && id) {
            try {
                const a = await api.post(`/news/${id}`, news)
                success(`Update success news with name ${a.data.data.name}`)
            } catch (err) {
                error(`Update fail news with name ${news.name} \n at ${err.response?.data?.message}`)
            }
        } else {
            try {
                const a = await api.post(`/news`, news)
                navigate(`/admin/news/${a.data.data.id}`)
                success(`Create success news with name ${a.data.data.name}`)
            } catch (err) {
                error(`Create fail news with name ${news.name} \n at ${err.response?.data?.message}`)
            }
        }
    }

    return (
        <div>
            <ModalImage
                isOpen={openImage}
                onCancel={() => setOpenImage(false)}
                onOk={(image) => {
                    setOpenImage(false)
                    if (news.image === null || news.image === undefined) setNews((prev) => ({ ...prev, image: image.url }))
                    setImages((prev) => [...prev, image.url])
                    editor.current.selection.insertHTML(`<img src="${image.url}" alt="cc"/>`)
                }}
            />

            <Layout>
                <Content className="pr-[20px]">
                    <div className="space-y-10">
                        <Input
                            size="large"
                            placeholder="Tiêu đề bài viết"
                            value={news?.name}
                            onChange={(e) => setNews({ ...news, name: e.target.value })}
                        />

                        <TextArea
                            rows={4}
                            value={news.description}
                            onChange={(e) => setNews((prev) => ({ ...prev, description: e.target.value }))}
                        ></TextArea>

                        <JoditEditor
                            tabIndex={1} // tabIndex of textarea
                            ref={editor}
                            config={useMemo(
                                () => ({
                                    // removeButtons: ['brush', 'file'],
                                    showXPathInStatusbar: false,
                                    showCharsCounter: false,
                                    showWordsCounter: false,
                                    toolbarAdaptive: false,
                                    readonly: false,
                                    language: "en",
                                    events: {
                                        afterInit: (instance) => {
                                            editor.current = instance
                                        },
                                    },
                                    buttons: [
                                        ...Jodit.defaultOptions.buttons,
                                        {
                                            name: "🖼️",
                                            tooltip: "insert image",
                                            icon: "🖼️",
                                            exec: () => {
                                                setOpenImage(true)
                                            },
                                        },
                                    ],
                                }),
                                []
                            )}
                            value={news?.content}
                            // onBlur={(text) => handleTextChange(text)}
                            onChange={(content) => setNews((prev) => ({ ...prev, content }))}
                        />
                    </div>
                </Content>

                <Sider style={{ backgroundColor: "transparent" }} width={"25%"}>
                    <Affix offsetTop={50}>
                        <Card
                            style={{ marginBottom: "15px" }}
                            title="Status"
                            size="small"
                            actions={[
                                <div key={1} className="w-[100%] flex justify-center">
                                    <div className="w-[25%]"></div>
                                    <Button
                                        onClick={handleOnsubmit}
                                        type="primary"
                                        className="w-[50%]"
                                        style={{ backgroundColor: token.colorPrimaryHover }}
                                        block
                                    >
                                        Update
                                    </Button>
                                    <div className="w-[25%]"></div>
                                </div>,
                            ]}
                        >
                            <Descriptions
                                layout="horizontal"
                                column={1}
                                items={[
                                    {
                                        key: news.isPublished,
                                        label: "Status",
                                        children: (
                                            <Switch
                                                checkedChildren="Publish"
                                                unCheckedChildren="Draft"
                                                defaultChecked={news.isPublished}
                                                onChange={(isPublished) => setNews((prev) => ({ ...prev, isPublished }))}
                                            />
                                        ),
                                    },
                                    {
                                        key: news.createAt,
                                        label: "create at",
                                        children: news?.createAt,
                                    },
                                    {
                                        key: news?.user,
                                        label: "Author",
                                        children: news?.user,
                                    },
                                    {
                                        key: news.categoryId,
                                        label: "Category",
                                        children: (
                                            <Cascader
                                                className="w-full"
                                                options={getCates(cates)}
                                                value={getParentCateId(cates, news.categoryId)}
                                                onChange={(value) =>
                                                    setNews((prev) => ({
                                                        ...prev,
                                                        categoryId: value && value.length > 1 ? value[value.length - 1] : null,
                                                    }))
                                                }
                                                placeholder="Select category"
                                                showSearch={{
                                                    filter: (inputValue, path) =>
                                                        path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1),
                                                }}
                                                onSearch={(value) => console.log(value)}
                                            />
                                        ),
                                    },
                                    {
                                        key: news.tags,
                                        label: "Tags",
                                        children: <Tags initTags={news?.tags} selectedTags={(tags) => setNews((prev) => ({ ...prev, tags }))} />,
                                    },
                                    {
                                        key: news.image,
                                        label: "Thumbnail",
                                        children: (
                                            <>
                                                {images &&
                                                    images.map((v, index) => (
                                                        <Tooltip
                                                            key={index}
                                                            // trigger={("click", "hover", "focus")}
                                                            title={news.image === v ? "This is thumb" : "click to select thumb"}
                                                        >
                                                            <div onClick={() => setNews((prev) => ({ ...prev, image: v }))}>
                                                                {news.image && news.image === v ? (
                                                                    <Avatar className=" m-1" key={index} src={v} size={50} />
                                                                ) : (
                                                                    <Avatar className=" m-1" key={index} src={v} size={30} />
                                                                )}
                                                            </div>
                                                        </Tooltip>
                                                    ))}
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </Affix>
                </Sider>
            </Layout>
        </div>
    )
}
NewsDetail.propTypes = { isAdd: propTypes.bool }
export default NewsDetail
