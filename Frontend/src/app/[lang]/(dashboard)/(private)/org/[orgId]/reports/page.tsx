type Props = { params: { orgId: string } }

export default function Page({ params }: Props) {
  const { orgId } = params

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Reports</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Organization ID: {orgId}</p>
    </div>
  )
}