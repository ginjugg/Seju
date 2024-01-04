import ElectronApi from '@runemaker/src/libs/ElectronApi.ts';
import ILockfileData from '@runemaker/src/interfaces/ILockfileData';
import LeagueOfLegendsClientApi from '@runemaker/src/libs/LeagueOfLegendsClientApi';

export function openedClient () {
  const electron = new ElectronApi();

  if (!localStorage.getItem('Lockfile')) {
    localStorage.setItem('Lockfile', '');
  }

  electron.getLeagueOfLegendsPath('/home/ginju/league-of-legends/wine/prefix/drive_c/Riot Games/League of Legends/lockfile')
  electron.setLeagueOfLegendsPath();
  electron.watch();
  electron.openHandle();

  async function setData() {
    console.log('hier')
    const lockfileData = await electron.getLockfileContent();
    localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
    const lockfileContent = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
    
    const lolClientApi = LeagueOfLegendsClientApi.create(lockfileContent);

   let output = {
      'handShake': await lolClientApi.handshakeRequest(),
      'CurrentRunePage': await lolClientApi.getCurrentRunePage(),
      'MatchesData': await lolClientApi.requestMatchesData(),
      'SummonerData': await lolClientApi.requestSummonerData()
   }
    return output
  }
  
  return setData()
};