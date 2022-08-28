import React, { useState, useCallback } from 'react'
import Team from './Team'

import './TeamList.css'
const TeamList = () => {
  const [isTeamNameValid, setIsTeamNameValid] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamList, setTeamList] = useState([
    {
      name: 'Team1',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    },
    {
      name: 'Team2',
      channels: [
        {
          name: 'Channel1',
          id: 1
        },
        {
          name: 'Channel2',
          id: 2
        }
      ]
    }
  ]);

  const onTeamNameChanged = useCallback((e) => {
    const name = e.target.value;
    setIsTeamNameValid(name.trim() 
    && !teamList.find((team) => team.name.toLowerCase() === name.toLowerCase()));
    setTeamName(name);
  }, [teamList]);

  const onAddTeamClicked = useCallback(() => {
    setTeamList((pre) => [...pre, { name: teamName, channels: [] }]);
  }, [teamName])

  function onChannelAdded(teamIndex, channel) { //???
    const team = teamList[teamIndex];
    debugger
    team.channels = [...team.channels, channel];
    const newTeamList = [...teamList];
    newTeamList[teamIndex] = team;
    setTeamList(newTeamList);
  }

  function onChannelRemoved(teamIndex, channelId) {
    debugger
    const team = teamList[teamIndex];
    team.channels = team.channels.filter((channel) => channel.id !== channelId);
    const newTeamList = [...teamList];
    newTeamList[teamIndex] = team;
    setTeamList(newTeamList);
  }
  return (
    <div className='w-50 mx-auto'>
      <div className='card w-35 mt-50 mx-auto px-10 py-15'>
        <div className='layout-column' data-testid='team-list'>
          {teamList && teamList.map((team, id) => (
            <Team
              key={id}
              id={id}
              team={team}
              // onChannelAdded={onChannelAdded.bind(null, id)}
              onChannelAdded={(e) => onChannelAdded(id, e)}
              onChannelRemoved={onChannelRemoved.bind(null, id)}
            />
          ))}
        </div>
        <div className='layout-row'>
          <input
            value={teamName}
            onChange={onTeamNameChanged}
            placeholder='Enter Team Name'
            className='team-list-input w-75'
            data-testid='team-name-input'
          />
          <button
            onClick={onAddTeamClicked}
            disabled={!isTeamNameValid}
            className='team-list-btn x-small w-35 h-30 pa-6 ma-0 ml-6'
            data-testid='add-team-btn'
          >
            Add Team
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamList
