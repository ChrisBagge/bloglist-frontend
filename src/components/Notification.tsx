import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}



//function Notification({ noteType }: { noteType: NoteType }) {
function Notification() {

  const noteType: NoteType = useAppSelector((state: RootState) => state.notifications)


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