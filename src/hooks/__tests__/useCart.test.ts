import { act, renderHook } from '@testing-library/react-hooks';
import { Product } from '../../types/product';
import { useCart } from '../useCart';

const mockProducts: Product[] = [
  { id: 1, name: 'Paracetamol 500mg', price: 15000, category: 'Pain Relief', isPrescription: false },
  { id: 2, name: 'Amoxicillin 500mg', price: 45000, category: 'Antibiotic', isPrescription: true },
];

describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate total quantity correctly', () => {
    const { result } = renderHook(() => useCart());

    // Add 3 units of product 1
    act(() => {
      result.current.setQuantity(1, 3);
    });

    // Add 2 units of product 2
    act(() => {
      result.current.setQuantity(2, 2);
    });

    // Verify total quantity
    const totals = result.current.getTotals(mockProducts);
    expect(totals.totalQty).toBe(5);

    // Clear cart and verify
    act(() => {
      result.current.clearCart();
    });

    const totalsAfterClear = result.current.getTotals(mockProducts);
    expect(totalsAfterClear.totalQty).toBe(0);
  });

  test('should calculate total amount correctly', () => {
    const { result } = renderHook(() => useCart());

    // Set quantities
    act(() => {
      result.current.setQuantity(1, 10);
      result.current.setQuantity(2, 5);
    });

    // Verify total amount: 10 * 15000 + 5 * 45000 = 375000
    const totals = result.current.getTotals(mockProducts);
    expect(totals.totalAmount).toBe(375000);

    // Clear cart and verify
    act(() => {
      result.current.clearCart();
    });

    const totalsAfterClear = result.current.getTotals(mockProducts);
    expect(totalsAfterClear.totalAmount).toBe(0);
  });
});
