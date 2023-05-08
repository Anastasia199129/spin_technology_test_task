export const getDataByHeaderName = (data: any, query:string) => {
  if (data) {
    const subject = data.find(
      ({ name }: { name: string }) => name === query
    )
    if (subject?.value) {
      return subject.value
    } else return 'without a subject'
  } else return ''
}