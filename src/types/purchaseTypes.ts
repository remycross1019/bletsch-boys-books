export type PurchaseOrder = {
    id: string,
    date: string,
    vendor: {id: string, name: string, bookBuybackPercentage: number}
    purchases: any[],
    totalBooks: number,
    uniqueBooks: number,
    cost: number
}

export type Vendor = {
    id: string, 
    name: string
}

export type Purchase = {
    id: string,
    bookId: string,
    purchaseOrderId: string,
    quantity: number,
    price: number,
    subtotal: number
}
