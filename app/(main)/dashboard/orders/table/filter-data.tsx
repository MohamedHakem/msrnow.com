import {
  // ArrowDownIcon,
  // ArrowRightIcon,
  // ArrowUpIcon,
  CheckCircledIcon,
  // CircleIcon,
  CrossCircledIcon,
  // QuestionMarkCircledIcon,
  // StopwatchIcon,
} from "@radix-ui/react-icons"

export const الحالة = [
  {
    value: "PENDING",
    label: "العميل في انتظارك",
    icon: CheckCircledIcon
  },
  {
    value: "PROCESSING",
    label: "جاري التحضير",
    icon: CheckCircledIcon,
  },
  {
    value: "SHIPPED",
    label: "تم الشحن",
    icon: CheckCircledIcon,
  },
  {
    value: "DELIVERED",
    label: "تم التسليم",
    icon: CheckCircledIcon,
  },
  {
    value: "CANCELLED",
    label: "تم الإلغاء",
    icon: CrossCircledIcon,
  },
  {
    value: "COMPLETED",
    label: "أكتمل بنجاح",
    icon: CheckCircledIcon,
  },
  {
    value: "RETURNED",
    label: "مرتجع",
    icon: CrossCircledIcon,
  },
]

export const الفئة = [
  {
    label: "أحذية",
    value: "أحذية",
  },
  {
    label: "هواتف",
    value: "هواتف",
  },
  {
    label: "لابتوب",
    value: "لابتوب",
  },
]