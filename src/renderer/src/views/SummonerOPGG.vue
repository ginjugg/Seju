<template>
  <div key="opgg">
    <div v-if="isLoading">
      Loading OPGG Data...
    </div>
    <div v-else>
      <div class="mt-3">
        <table class="w-full table-fixed rounded-lg bg-blue-800 text-center leading-none mt-6">
          <tr>
            <th>OPGG API</th>
            <th>Local League Client</th>
          </tr>
          <tr>
            <td>{{ opgg }}</td>
            <td style="vertical-align: top;">
              {{ client }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import championStats from '../custom/opgg_test';
import { openedClient } from '../custom/leagueclient_test.ts'

export default { 
  computed: {
    console: () => console,
    window: () => window,
  },
  data () {
    return {
        isLoading: true,
        // other data
    }
  },
  async mounted() {
    const championData = new championStats();
    const clientData = await openedClient();
    const opggData = await championData.getChampionStats();
    this.isLoading = false;
    this.console.log('opggData:', opggData)
    this.console.log('clientData', clientData)
    this.opgg = JSON.stringify(opggData, null, 2);
    this.client = JSON.stringify(clientData, null, 2);
  }
}
</script>
