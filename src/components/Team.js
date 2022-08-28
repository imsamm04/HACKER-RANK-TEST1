import React, { useCallback, useRef, useState } from 'react'

import './Team.css'

const Team = ({ team, id, onChannelRemoved, onChannelAdded }) => {
  const [isChannelNameValid, setIsChannelNameValid] = useState(false);
  const [channelName, setChannelName] = useState('');
  const currentID = useRef(0);

  const onChannelNameChanged = useCallback((e) => {
    const name = e.target.value;
    setIsChannelNameValid(name.trim() && !team.channels.find((channel) => channel.name.toLowerCase() === name.toLowerCase()));
    setChannelName(name);
  }, [])

  function onAddChannelClicked() {
    onChannelAdded({ name: channelName, id: currentID.current });
    setChannelName('');
  }

  useCallback(()=>{

  },[])

  return (
    <div>
      {
        team && <h4 className='mt-0 mb-6' >{team.name}</h4>
      }
      {
        team &&
        <div className='layout-row justify-content-end mb-6'>
          <input
            value={channelName}
            onChange={onChannelNameChanged}
            placeholder='Enter Channel Name'
            className="channel-name-input w-45 px-13"
            data-testid={'channel-name-input-' + id}
          />
          <button
            disabled={!isChannelNameValid}
            onClick={onAddChannelClicked}
            className='channel-name-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid={'add-channel-btn-' + id}
          >
            Add Channel
          </button>
        </div>
      }
      {
        team &&
        <ul className='styled mb-20 pl-25' data-testid={'channel-list-' + id}>
          {team.channels && team.channels.map((channel) => (
            <li
              key={channel.id}
              className='flex slide-up-fade-in justify-content-between align-items-center pl-10 pr-5 py-6 mt-0 mb-6'
            >
              {currentID.current = channel.id + 1}
              <span>{channel.name}</span>
              <button
                onClick={onChannelRemoved.bind(null, channel.id)}
                data-testid={'remove-channel-button-' + id + channel.id}
                className='icon-only x-small danger ma-0 pa-0'
              >
                <i className="material-icons">delete</i>
              </button>
            </li>
          ))}
        </ul>
      }
    </div>

  )
}

export default Team
