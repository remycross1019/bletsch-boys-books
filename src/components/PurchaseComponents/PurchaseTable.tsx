import { useState } from 'react';
import { api } from "../../utils/api";
import TableDetails from "../TableComponents/TableDetails";
import FilterableColumnHeading from "../TableComponents/FilterableColumnHeading";
import TableHeader from "../TableComponents/TableHeader";
import CreateEntries from '../CreateEntries';
import PurchaseOrderTableRow from '../TableComponents/PurchaseOrderTableRow';
import AddPurchaseOrderModal from './AddPurchaseOrderModal';
import PurchasesCard from './PurchasesCard';
import PurchaseDetailsCard from './PurchaseDetailsCard';





export default function PurchaseTable() {
  const purchaseOrder = api.purchaseOrder.getPurchaseOrderDetails.useQuery().data;
  const [purchases, setPurchases] = useState<any[]>([])
  const [purchaseOrderId, setId] = useState('')
  const [date, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currOrder, setCurrOrder] = useState({
    id: '',
    date: '',
    vendorName:''
  })
//   const [displayEntries, setDisplayEntries] = useState(false)
  const [displayEdit, setDisplayEdit] = useState(false)
  const [displayDelete, setDelete] = useState(false)
  const [displayDetails, setDisplayDetails] = useState(false)
  const [displayAdd, setDisplayAdd] = useState(false)
  const createPurchaseOrder = api.purchaseOrder.createPurchaseOrder.useMutation()
  const vendors = api.vendor.getVendors.useQuery().data

  const handleOrderSubmit = async (date: string, vendorId: string) => {
    // setDate(date)
    // setDisplayEntries(true)
    console.log("Date: "+date)
    console.log(vendorId)
    if (createPurchaseOrder){
        createPurchaseOrder.mutate({
        date: date,
        vendorId: vendorId
      })
    }
  }

  const handleEdit = async (id:string) => {
    if (purchaseOrder){
      for (const order of purchaseOrder){
        if (order.id === id){
          setCurrOrder({
            id: order.id, 
            date: order.date,
            vendorName: order.vendorName
          })
        }
      }
      setDisplayEdit(true)
    }
    
  }

  const handleDelete = async (id:string) => {
    if (purchaseOrder){
        for (const order of purchaseOrder){
          if (order.id === id){
            setCurrOrder({
              id: order.id, 
              date: order.date,
              vendorName: order.vendorName
            })
          }
        }
        setDelete(true)
      }
  }

  const handleView = async (id:string) => {
    if (purchaseOrder){
      for (const order of purchaseOrder){
        if (order.id === id){
          setPurchases(order.purchases)
        }
      }
      setDisplayDetails(true)
    }
  }

  const handleAdd = async (id:string) => {
    if (purchaseOrder){
      for (const order of purchaseOrder){
        if (order.id === id){
          setId(order.id)
        }
      }
      setDisplayAdd(true)
    }
  }


  // function renderEntries() {
  //   return <>
  //     {displayEntries ? <CreateSaleEntries submitText='Create Sale Reconciliation'>
  //           <SalesRecCard date={date} cardType="entry" salesRecId={' '}></SalesRecCard>
  //     </CreateSaleEntries>: null}
  //   </>;
  // }

  function renderEdit() {
    return <>
      {(displayEdit && currOrder) ?
          <CreateEntries closeStateFunction={setDisplayEdit} submitText="Edit Purchase Order"> 
            <PurchasesCard date={currOrder.date} cardType="edit" purchaseOrderId={currOrder.id} vendorName={currOrder.vendorName}></PurchasesCard></CreateEntries> : null}
  </>;
  }

  function renderDelete() {
    return <>
      {displayDelete ? <CreateEntries closeStateFunction={setDelete} submitText='Delete Purchase Order'>
            <PurchasesCard date={currOrder.date} cardType="delete" purchaseOrderId={currOrder.id} vendorName={currOrder.vendorName}></PurchasesCard>
      </CreateEntries>: null}
  </>;
  }

  function renderDetails() {
    return <>
      {displayDetails ? (purchases ? (
          <CreateEntries closeStateFunction={setDisplayDetails} submitText="Show Purchase Details"> {purchases.map((purchase) => (
            <PurchaseDetailsCard cardType={'edit'} purchaseComplete={purchase}></PurchaseDetailsCard>))}</CreateEntries>) : null) : null}
  </>;
  }

  function renderAdd() {
    const dummyPurchase = {
      purchase: {
        id: '',
        purchaseOrderId: purchaseOrderId,
        price: 0,
        quantity: 0,
        bookId: ''
      },
      subtotal: 0
    }
    return <>
      {(displayAdd && purchaseOrderId)? 
          <CreateEntries closeStateFunction={setDisplayAdd} submitText="Add Sale"> 
            <PurchaseDetailsCard cardType={'entry'} purchaseComplete={dummyPurchase}></PurchaseDetailsCard></CreateEntries> : null}
  </>;
  }


  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <TableDetails tableName="Purchase Orders"
                      tableDescription="A list of all the Purchase Orders and Purchases.">
          <AddPurchaseOrderModal showPurchaseOrderEdit={handleOrderSubmit} buttonText="Create Purchase Order"
                        submitText="Create Purchase Order" vendorList={vendors}></AddPurchaseOrderModal>
        </TableDetails>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div
                  className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 table-auto">
                  <TableHeader>
                    <FilterableColumnHeading label="Purchase Order ID"
                                             firstEntry={true}></FilterableColumnHeading>
                    <FilterableColumnHeading label="Date Created"></FilterableColumnHeading>
                    <FilterableColumnHeading label="Vendor Name"></FilterableColumnHeading>
                    <FilterableColumnHeading label="Unique Books"></FilterableColumnHeading>
                    <FilterableColumnHeading label="Total Books"></FilterableColumnHeading>
                    <FilterableColumnHeading label="Total Cost"></FilterableColumnHeading>
                  </TableHeader>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {purchaseOrder ? purchaseOrder.map((order) => (
                      <PurchaseOrderTableRow onAdd={handleAdd} onView={handleView} onDelete={handleDelete} onEdit={handleEdit} purchaseOrderInfo={order}></PurchaseOrderTableRow>
                  )) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* {renderEntries()} */}
          {renderEdit()}
          {renderDelete()}
          {renderDetails()}
          {renderAdd()}
        </div>
      </div>

  )
}
