export default function ProductItemEditPage({ params }: { params: { id: string } }) {
  console.log('[ProductItemEditPage] params: ', params);
  return <div>product page for product id of {params.id}</div>;
}
