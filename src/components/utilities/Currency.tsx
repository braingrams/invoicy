export function NGN(value: string | null | undefined | number) {
  return `₦${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
export function USD(value: string | null | undefined | number) {
  return `$${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
export function EUR(value: string | null | undefined | number) {
  return `£${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
export function CUR(value: string | null | undefined | number) {
  return ` ${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
