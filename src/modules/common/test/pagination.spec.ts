import getPaginationOffset from '../pagination';

describe('getPaginationOffset', () => {
  it('should return the correct skip', () => {
    expect(getPaginationOffset(1, 5)).toBe(0);
    expect(getPaginationOffset(2, 5)).toBe(5);
    expect(getPaginationOffset(3, 5)).toBe(10);
    expect(getPaginationOffset(4, 5)).toBe(15);
  });
});
