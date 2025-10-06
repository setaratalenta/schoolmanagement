type Props = { params: { orgId: string; schoolId: string } }

export default function Page({ params }: Props) {
  const { orgId, schoolId } = params

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Student Affairs Behavior</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Org: {orgId}</p>
      <p className='mt-1 text-sm text-muted-foreground'>School: {schoolId}</p>
    </div>
  )
}