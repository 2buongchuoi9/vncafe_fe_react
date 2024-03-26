import { Avatar, Card, Cascader, Descriptions, Dropdown, Image, Input, Select, Table, Tag, Tooltip } from "antd"
import Search from "antd/es/input/Search"
import { debounce } from "lodash"
import propTypes from "prop-types"
import { useEffect, useState } from "react"
import { render } from "react-dom"
import { IoIosSearch } from "react-icons/io"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import api from "~/api/api"
import { cateSelect } from "~/app/slice/Category.slice"
import useDebounce from "~/hooks/useDebounce"
import { getCates, getParentCateId } from "~/utils"

const queryInitialState = {
    page: 0,
    size: 10,
    sort: null,

    categoryId: null,
    keySearch: null,
    startDate: null,
    endDate: null,
    isPublished: null,
}
const items = [
    { label: "all", value: null },
    { label: "Publish", value: "true" },
    { label: "Draft", value: "false" },
]

const col = (title, dataIndex, render) => ({ title, dataIndex, render, align: "center" })

const column = [
    col("name", "name", (text, record) => <Link to={record.id}>{text}</Link>),
    col("description", "description", (text) => text),
    col("thumb", "image", (text) => (
        <div className="h-12 w-16 object-cover">
            <Image className="object-cover" src={text}></Image>
        </div>
    )),
    col("category", "category", (text) => text?.parentName + "/" + text?.name),
    col("status", "isPublished", (text) => (text === true ? <Tag color="success">Publish</Tag> : <Tag color="error">Draft</Tag>)),
    col("date", "createAt", (text) => text),
    col("author", "author"),
]

const AllNewsAdmin = () => {
    const cates = useSelector(cateSelect.category)
    const [news, setNews] = useState([])
    const [query, setQuery] = useState(queryInitialState)
    const debouncedSearch = debounce((value) => setQuery((prev) => ({ ...prev, keySearch: value ? value.trim() : null })), 500)
    const [totalElement, setTotalElement] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const a = await api.get(`/news`, { params: query })
            const data = a.data
            const option = {
                page: data.data.currentPage,
                size: data.data.pageSize,
                totalPage: data.data.totalPage,
                totalElement: data.data.totalElement,
            }

            setQuery((prev) => ({ ...prev, page: option.page, size: option.size }))
            setNews(data.data.content)
            setTotalElement(option.totalElement)
        }
        fetch()
    }, [...Object.keys(query).map((key) => query[key])])

    return (
        <div>
            all news ({totalElement} items)
            <Descriptions
                title="fitter"
                layout="horizontal"
                className="space-x-4"
                column={4}
                items={[
                    {
                        key: "category",
                        label: "category",
                        children: (
                            <Cascader
                                className="w-full"
                                options={getCates(cates)}
                                value={getParentCateId(cates, query?.categoryId)}
                                onChange={(value) => setQuery((prev) => ({ ...prev, categoryId: value ? value[value.length - 1] : null }))}
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
                        key: "keySearch",
                        label: "keySearch",
                        children: (
                            <Input
                                onChange={(e) => debouncedSearch(e.target.value)}
                                className="rounded-full"
                                placeholder="Bài viết, tác giả, chủ đề"
                                prefix={<IoIosSearch />}
                            />
                        ),
                    },
                    {
                        key: "isPublished",
                        label: "Status",
                        children: (
                            <Select
                                style={{ width: 120 }}
                                options={items}
                                defaultValue={null}
                                onChange={(value) => setQuery((prev) => ({ ...prev, isPublished: value }))}
                            />
                        ),
                    },
                ]}
            />
            <Table
                pagination={{
                    pageSize: query.size,
                    current: query.page + 1,
                    total: totalElement,
                    showTotal: (total) => `total: ${total} items`,
                    showSizeChanger: true,
                    onShowSizeChange: (current, pageSize) => setQuery((prev) => ({ ...prev, page: 0, size: pageSize })),
                    onChange: (page, pageSize) => setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize })),
                }}
                columns={column}
                dataSource={news}
                rowClassName={"max-h-10 p-2"}
                rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows, info) => console.log("onchange rowSelect: ", selectedRowKeys, selectedRows, info),
                }}
            />
        </div>
    )
}
AllNewsAdmin.propTypes = {}
export default AllNewsAdmin
