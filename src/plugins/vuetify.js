import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/lib/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { fr },
      current: 'fr',
    },
});
