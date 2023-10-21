import { DeleteOutlined, RightOutlined, SelectOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { formatLink } from "lib/links";

interface LinksOptions {
    onDelete: (id: string) => void
    onSelect?: (id: string) => void
    resources: Resource[]
    selectedItems?: string[],
    title?: string
}

export default function LinksList({ resources, onDelete, onSelect, selectedItems, title }: LinksOptions) {
    function onOpen(itemId: string) {
        let index = resources.findIndex((r) => r.id == itemId)

        if (index == -1) {
            return
        }

        let link = formatLink(resources[index].content)

        window.open(link, '_blank')
    }

    return (
        <div>
            <h2>{title ?? "Links"}</h2>
            <ul>
                {
                    resources.map(
                        (r) => <li key={r.id} className="break-all">
                            <div>{r.content}</div>
                            <div className="mb-2">
                                <Button onClick={() => onDelete(r.id)} className="mr-2">Delete<DeleteOutlined></DeleteOutlined></Button>
                                {onSelect && !selectedItems.includes(r.id) && <Button className="mr-2" onClick={() => onSelect(r.id)}>Select<SelectOutlined></SelectOutlined></Button>}
                                <Button onClick={() => onOpen(r.id)} className="mr-2">Open<RightOutlined></RightOutlined></Button>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}