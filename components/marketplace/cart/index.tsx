"use client"

// import { getCart } from 'lib/shopify';
import useCart from '@/hooks/use-cart';
import CartModal from './modal';

export default function Cart() {
  // const cookie = cookies();
  // const cartId = cookie ? cookies().get('cartId')?.value : null;
  const cart = useCart()
  // const cartId = cookies().get('cartId')?.value;
  // let cart;

  // if (cartId) {
  // cart = await getCart(cartId);
  // }

  return <CartModal cart={cart} />;
}
