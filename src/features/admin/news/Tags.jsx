import { useEffect, useRef, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Flex, Input, Tag, theme, Tooltip } from "antd"
import propTypes from "prop-types"
const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
}
const Tags = ({ selectedTags, initTags }) => {
    const { token } = theme.useToken()
    const [tags, setTags] = useState(initTags ? initTags : ["ex tag"])
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState("")
    const inputRef = useRef(null)
    const editInputRef = useRef(null)
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus()
        }
    }, [inputVisible])
    useEffect(() => {
        editInputRef.current?.focus()
    }, [editInputValue])
    useEffect(() => {
        selectedTags(tags)
    }, [tags])
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag)
        setTags(newTags)
    }
    const showInput = () => {
        setInputVisible(true)
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue])
        }
        setInputVisible(false)
        setInputValue("")
    }
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value)
    }
    const handleEditInputConfirm = () => {
        const newTags = [...tags]
        newTags[editInputIndex] = editInputValue
        setTags(newTags)
        setEditInputIndex(-1)
        setEditInputValue("")
    }
    const tagPlusStyle = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: "dashed",
    }
    return (
        <Flex gap="4px 0" wrap="wrap">
            {tags.map((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInputRef}
                            key={tag}
                            size="small"
                            style={tagInputStyle}
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    )
                }
                const isLongTag = tag.length > 20
                const tagElem = (
                    <Tag
                        key={tag}
                        closable={true}
                        style={{
                            userSelect: "none",
                        }}
                        onClose={() => handleClose(tag)}
                    >
                        <span
                            onDoubleClick={(e) => {
                                if (index !== 0) {
                                    setEditInputIndex(index)
                                    setEditInputValue(tag)
                                    e.preventDefault()
                                }
                            }}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                    </Tag>
                )
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                )
            })}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                    New Tag
                </Tag>
            )}
        </Flex>
    )
}
Tags.propTypes = {
    selectedTags: propTypes.func,
    initTags: propTypes.arrayOf(propTypes.string),
}
export default Tags
