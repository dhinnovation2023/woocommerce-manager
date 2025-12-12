import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Fragment, ReactNode } from "react"
import AnimationLoader from "./loader"
import EmptyText from "./empty"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

export function TableTemplate({
    dataRow,
    headerRow,
    inProgress,
    onPerPageChange,
    handlePagination,
    perPage,
    pageNumber,
}: {
    headerRow: ReactNode[],
    dataRow: ReactNode[][] | null,
    inProgress: boolean,
    onPerPageChange: (value: number) => void,
    handlePagination: (action: -1 | 1) => void,
    perPage: number,
    pageNumber: number,
}) {

    if (inProgress) {
        return (
            <AnimationLoader
                text="Loading Orders..."
            />
        )
    }

    if (!dataRow) {
        return (
            <EmptyText
                text="No Orders found"
            />
        )
    }

    return (
        <div
            className="bg-background rounded-lg"
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        {headerRow.map((header, index) => (
                            <TableHead
                                key={index}
                                className="py-4 px-5 font-semibold"
                            >{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody
                    className="border-b border-stroke-light/70"
                >
                    {dataRow.map((dataRow, index) => (
                        <TableRow key={index}>
                            {dataRow.map((data, index) => (
                                <TableCell
                                    key={index}
                                    className="py-4 px-5"
                                >{data}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>

                <TableCaption
                    className="pb-5 pt-2 px-5"
                >
                    <div
                        className="flex items-center gap-2 justify-between"
                    >
                        <div>
                            <Select
                                onValueChange={(value) => {
                                    const perPage = parseInt(value);
                                    onPerPageChange(perPage);
                                }}
                            >
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder={`${perPage} Per Page`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        {
                                            [
                                                '5',
                                                '10',
                                                '20',
                                                '50',
                                                '100',
                                            ].map((status, index) => (
                                                <SelectItem
                                                    value={status || 'all'}
                                                    key={index}
                                                    className="capitalize"
                                                >{status ? status.split('-').join(' ') : "all"}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div
                            className="flex items-center gap-2"
                        >
                            {
                                [
                                    {
                                        label: "Prev",
                                        icon: RiArrowLeftSLine,
                                        onClick: () => handlePagination(-1)
                                    },
                                    {
                                        label: "Next",
                                        icon: RiArrowRightSLine,
                                        onClick: () => handlePagination(1),
                                    },
                                ].map((action, index) => (
                                    <Fragment
                                        key={index}
                                    >
                                        {index === 1 && (
                                            <p>{pageNumber} page</p>
                                        )}
                                        <Button
                                            className={"flex items-center gap-2" + ` ${index === 1 ? "flex-row-reverse" : ""}`}
                                            onClick={action.onClick}
                                        >
                                            <action.icon
                                                size={20}
                                            />
                                            <p
                                                className="text-sm"
                                            >{action.label}</p>
                                        </Button>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </TableCaption>
            </Table>
        </div>
    )
}
