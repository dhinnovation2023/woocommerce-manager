'use client';

import ErrorTemplate from "@/components/elements/ui/error-template";
import { TableTemplate } from "@/components/elements/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { handleCatchBlock } from "@/functions/error-handler";
import DashboardLayout from "@/layouts/dashboard"
import { WcOrdersInterface } from "@/types/woocommerce-types/order";
import { GetAllWcOrderRequestData } from "@/woocommerce/orders/get-all";
import { RiMore2Line, RiSearchLine } from "@remixicon/react"
import axios from "axios";
import { useEffect, useState } from "react";
import OrderStatusUi from "./status-ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const WoocommerceOrdersPage = () => {

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [orders, setOrders] = useState<WcOrdersInterface[]>();

  // filters
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<WcOrdersInterface["status"] | null>(null);

  const [searchText, setSearchText] = useState<string>('');
  const [deboundedSearchText, setDebouncedSearchText] = useState<string>('');

  useEffect(() => {
    (async () => {
      setInProgress(true);
      try {

        const requestData: GetAllWcOrderRequestData = {
          page: 1,
          per_page: perPage,
          status: status || undefined,
          search: deboundedSearchText,
        }

        const {
          data: orders,
        } = await axios.post<WcOrdersInterface[]>('/api/woocommerce/orders/get-all', requestData);

        setOrders(orders);
        setCurrentPage(1);

      } catch (err) {
        const message = handleCatchBlock(err);
        setError(message);
      }

      setInProgress(false);
    })()
  }, [status, perPage, deboundedSearchText])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000)

    return () => clearTimeout(timeout);
  }, [searchText])

  async function handlePagination (action: 1 | -1) {
    setInProgress(true);
    try {
      
      let nextPage: null | number = null;
      
      if (action === 1) {
        nextPage = currentPage + 1;
      } else {
        nextPage = currentPage - 1;
      }

      const requestData: GetAllWcOrderRequestData = {
        page: nextPage,
        per_page: perPage,
        status: status || undefined,
        search: searchText,
      }

      const response = await axios.post('/api/woocommerce/orders/get-all', requestData);

      setOrders(response.data);
      setCurrentPage(prev => ++prev);

    } catch (err) {
      const message = handleCatchBlock(err);
      setError(message);
    }
    setInProgress(false);
  }

  return (
    <DashboardLayout>

      <div
        className="flex flex-col md:flex-row gap-2 items-center justify-between mb-6"
      >
        <div
          className="w-75 bg-background rounded-lg"
        >
          <InputGroup
            className="w-full"
          >
            <InputGroupInput
              placeholder="Search Orders"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <InputGroupAddon>
              <RiSearchLine
                size={15}
              />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div
          className="bg-background rounded-lg"
        >
          <Select
            onValueChange={(value) => {
              setStatus(value === "all" ? undefined : value as WcOrdersInterface["status"])
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {
                  [
                    "",
                    "pending",
                    "processing",
                    "completed",
                    "on-hold",
                    "cancelled",
                    "refunded",
                    "failed"
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
      </div>

      {error && (
        <ErrorTemplate
          error={error}
        />
      )}
      <TableTemplate
        inProgress={inProgress}
        handlePagination={handlePagination}
        pageNumber={currentPage}
        perPage={perPage}
        onPerPageChange={(value) => {
          setPerPage(value)
        }}
        headerRow={
          [
            "Order",
            "Date",
            "Status",
            "Total",
            "Action",
          ]
        }
        dataRow={orders?.map((order, index) => ([
          `#${order.id}`,
          order.date_created.split('T')[0],
          OrderStatusUi({ text: order.status }),
          order.total,
          <div
            key={index}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                >
                  <RiMore2Line
                    size={20}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36" align="start">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ])) || null}
      />
    </DashboardLayout>
  )
}

export default WoocommerceOrdersPage