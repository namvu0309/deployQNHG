export function formatPriceToVND(amount) {
  const num = typeof amount !== "number" ? Number(amount) : amount;
  if (isNaN(num)) return "0 đ";
  return num.toLocaleString("vi-VN") + "đ";
}
