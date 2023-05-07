export const getSubject = (data: any) => {
  const subject = data.find(({ name }: { name: string }) => name === 'Subject')
  if (subject?.value) {
    return subject.value
  } else return 'without a subject'
}
