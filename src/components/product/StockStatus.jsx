/**
 * Inventory indicator driven purely by the product's real `stock`
 * value — no invented urgency. Thresholds: 0 = out of stock, 1-3 = low
 * stock ("Only N left"), else in stock.
 */
export default function StockStatus({ stock }) {
  if (stock <= 0) {
    return (
      <p className="text-sm font-medium text-grey-500" role="status">
        Out of Stock
      </p>
    );
  }

  if (stock <= 3) {
    return (
      <p className="text-sm font-medium" style={{ color: '#8C6F4E' }} role="status">
        Only {stock} left
      </p>
    );
  }

  return (
    <p className="text-sm font-medium text-black" role="status">
      In Stock
    </p>
  );
}
