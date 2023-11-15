'use server';

import { db } from '@/lib/db';
import { AddProductType } from '@/types';
import { User, getServerSession } from 'next-auth';
import { OrderStatus } from '@prisma/client';

export async function increment(slug: string, type: string) {
  slug = decodeURIComponent(slug);
  const data = await db.article.update({
    where: {
      ...(slug.length < 5 ? { short_slug: slug } : { slug: slug })
    },
    data: {
      ...(type === 'view' ? { views: { increment: 1 } } : { likes: { increment: 1 } })
    },
    select: { likes: true, shares: true, views: true }
  });

  return data;
}

export async function assignRole(userEmail: string, roleName: string) {
  console.log('assigning default role to: ', userEmail);
  try {
    const user = await db.user.update({
      where: {
        email: userEmail
      },
      data: {
        roles: { connect: { name: roleName } }
      },
      include: {
        roles: true
      }
    });
    console.log('[assignRole] user: ', user);
    return user;
  } catch (e) {
    console.log('assignRole action error: ', e);
  }
}

export async function AddProduct(productValues: AddProductType, product_images: string[], selectedSizeValues: string[], selectedColorValues: string[]) {
  console.log("selectedSizeValues: ", selectedSizeValues, " - selectedColorValues: ", selectedColorValues)
  const session = await getServerSession()
  console.log("getServerSession: ", session)
  if (session?.user?.email) {
    const user = await db.user.findUnique({ where: { email: session?.user?.email } })
    if (user && user.id) {
      const newProduct = db.product.create({
        data: {
          ...productValues,
          userId: user.id,
          ProductSizes: { connect: [...(selectedSizeValues.map(sizeId => ({ id: parseInt(sizeId) })))] },
          ProductColors: { connect: [...(selectedColorValues.map(colorId => ({ id: parseInt(colorId) })))] },
          images: {
            create: [...(product_images.map(img => ({ url: img })))]
          },
        }
      })
      return newProduct
    }
    return false
  }
  return false
}

export async function AddProductSlug(slug: string, id: number) {
  const newProduct = db.product.update({
    where: {
      id: id
    },
    data: {
      slug: slug
    },
  })
  return newProduct
}

type OrderType = {
  phone_number?: string
  shipping_country?: string
  shipping_city?: string
  shipping_address?: string
  shipping_general_notes?: string
  shipping_info_toSellers_consent: boolean
  shipping_info_save_consent?: boolean
  status: OrderStatus
}

type productsArr = {
  quantity: number
  productId: number
  at_price: number
  size?: string
  color?: string
}

export async function AddOrder(values: OrderType,
  productsArr: productsArr[],
  name: string, user: User, totalPrice: number
) {
  console.log("[AddOrder] values: ", values)
  console.log("[AddOrder] productsArr: ", productsArr)

  if (user && user.id) {
    const newOrder = await db.order.create({
      data: {
        ...values,
        userId: user.id,
        total_Amount: totalPrice,
        orderItems: {
          createMany: {
            data: [...(productsArr.map(p => ({
              quantity: 1,
              productId: p.productId,
              at_price: p.at_price,
              sizeId: p.size ? getSizeIdBySizeName(p.size) : null,
              colorId: p.color ? getColorIdByColorName(p.color) : null
            })))],
          },
        },
        orderHistory: { create: { status: OrderStatus.PENDING } },
      }
    })
    console.log("[AddOrder] newOrder: ", newOrder)
    return { status: true, msg: "تمت عملية الشراء بنجاح" }
  }

  return { status: false, msg: "من فضلك تأكد من تسجيل الدخول" }
}

function getSizeIdBySizeName(sizeName: string) {
  const sizes = [
    { id: 1, name: "40" },
    { id: 2, name: "41" },
    { id: 3, name: "42" },
    { id: 4, name: "43" },
    { id: 5, name: "44" },
    { id: 6, name: "45" },
    { id: 7, name: "46" },
    { id: 8, name: "47" },
    { id: 9, name: "48" },
    { id: 10, name: "49" },
    { id: 11, name: "50" },
    { id: 12, name: "51" },
    { id: 13, name: "52" },
    { id: 14, name: "53" }
  ]

  return sizes.find(size => size.name === sizeName)?.id || 0
}

function getColorIdByColorName(colorName: string) {
  const colors = [
    { id: 1, name: "أسود" },
    { id: 2, name: "رمادي" },
    { id: 3, name: "فضي" },
    { id: 4, name: "أبيض" },
    { id: 5, name: "أحمر" },
    { id: 6, name: "أخضر" },
    { id: 7, name: "لموني" },
    { id: 8, name: "برتقالي" },
    { id: 9, name: "أصفر" },
    { id: 10, name: "أزرق" },
    { id: 11, name: "بني" },
    { id: 12, name: "جملي" },
  ]

  return colors.find(color => color.name === colorName)?.id || 0
}

type userType = {
  name: string | null;
  phone_number: string | null;
  profile_image: string | null;
} | null

export async function updateUser(userValues: userType) {
  console.log("userValues: ", userValues)
  const session = await getServerSession()
  console.log("getServerSession: ", session)
  if (session?.user?.email) {
    const user = await db.user.findUnique({ where: { email: session?.user?.email } })
    if (user && user.email && userValues) {
      const updatedUser = db.user.update({
        where: { email: user.email },
        data: { name: userValues.name, phone_number: userValues.phone_number, image: userValues.profile_image },
      })
      return updatedUser
    }
    return false
  }
  return false
}