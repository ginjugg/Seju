import Axios from 'axios';
import Cheerio from 'cheerio';

export default class opgg {
  async getBuildId() {
    const opggRequest = {
      method: 'GET',
      url: 'https://www.op.gg',
    };

    const promise = Axios.request(opggRequest);
    const dataPromise = promise.then(function ({ data }: { data: any }) {
      const $ = Cheerio.load(data);
      const nextData = JSON.parse($('#__NEXT_DATA__').text());
      return nextData.buildId;
    });

    return dataPromise;
  }

  async getChampionStats() {
    return this.getBuildId().then((buildId) => {
      const promise = Axios.get('https://www.op.gg/_next/data/' + buildId + '/en_US/champions/ahri/build.json?region=euw&tier=gold&target_champion=Syndra&champion=ahri&position=mid').then(
        function ({ data }: { data: any }) {
          return data;
        },
      );
      return promise;
    });
  }
}