const skipRange = 1;

const getPaginationOffset = (page: number, pageSize: number): number =>
  (page - skipRange) * pageSize;

export default getPaginationOffset;
