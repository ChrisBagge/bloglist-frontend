import { ReactNode, useState, forwardRef, useImperativeHandle, Ref } from "react";

export interface RefObject {
  toggleVisibility: () => void
}

function Togglable({ children, buttonLabel }: { children: ReactNode, buttonLabel: string }, ref: Ref<RefObject>) {
  //function Togglable(props: { children: ReactNode, buttonLabel: string }, ref: Ref<RefObject>) {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));


  return (
    <div>
      <div style={hideWhenVisible}>
        <button id= "new-blog" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default forwardRef(Togglable)