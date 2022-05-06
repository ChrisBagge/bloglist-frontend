enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}

function Notification({ noteType }: { noteType: NoteType }) {
  if (noteType.message === '')
    return <></>

  if (noteType.notificationType === NotificationType.info) {
    return (
      <div className='info'>
        {noteType.message}
      </div>)
  }
  else 
  return (
    <div className='error'>
      {noteType.message}
    </div>
  
  )



}

export default Notification;