import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';


const Sidebarjsx = () => {
  const [Extended, setExtended] = useState(false);
  const { onSent, PrevPrompts, setRecentPrompt,newChat } = useContext((Context))

  const loadPrompt =async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt)
  }
  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt='' />
        <div  onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt='' />
          {Extended ? <p>new chat</p> : null}
        </div>
        {Extended ? <div className="recent">
          <p className="recent-title">Recent</p>
          {PrevPrompts.map((item, index) => {
            return (
              <div onClick={() =>loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt='' />
                <p>{item.slice(0,18)}....</p>
              </div>

            )
          })}

        </div>
          : null
        }

      </div>
      <div className='bottom'>
        <div className="bottom-icon recent-entry">
          <img src={assets.question_icon} alt='' />
          {Extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-icon recent-entry">
          <img src={assets.history_icon} alt='' />
          {Extended ? <p>Activities</p> : null}
        </div>
        <div className="bottom-icon recent-entry">
          <img src={assets.setting_icon} alt='' />
          {Extended ? <p>Settings</p> : null}
        </div>

      </div>

    </div>
  )
}

export default Sidebarjsx