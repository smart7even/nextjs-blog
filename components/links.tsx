import { DeleteOutlined, SelectOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface LinksOptions {
    onDelete: (id: string) => void
    onSelect?: (id: string) => void
    resources: Resource[]
    selectedItems?: string[]
}

export default function LinksList({ resources, onDelete, onSelect, selectedItems }: LinksOptions) {
    return (
        <div>
            <h2>Links</h2>
            <ul>
                {
                    resources.map(
                        (r) => <li key={r.id}>
                            <div>{r.content}</div>
                            <Button onClick={() => onDelete(r.id)} className="mr-2">Delete<DeleteOutlined></DeleteOutlined></Button>
                            {onSelect && !selectedItems.includes(r.id) && <Button onClick={() => onSelect(r.id)}>Select<SelectOutlined></SelectOutlined></Button>}
                        </li>
                    )
                }
            </ul>
        </div>
    )
}