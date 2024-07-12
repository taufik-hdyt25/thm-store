export function formatRupiah(amount?: number): string {
  if (amount === undefined) {
    return "Rp 0"; // Atau sesuaikan dengan penanganan kasus khusus jika amount adalah undefined
  }

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
}