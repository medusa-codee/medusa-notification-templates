/**
 * Type definitions for order-created template data
 */

export type OrderCreatedTemplateData = {
  subject: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: string;
  currency: string;
  items: Array<{
    title: string;
    quantity: number;
    price: string;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  orderUrl?: string;
};

