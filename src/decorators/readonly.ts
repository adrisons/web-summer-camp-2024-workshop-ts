export const readonly = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
  descriptor.writable = false;
};
