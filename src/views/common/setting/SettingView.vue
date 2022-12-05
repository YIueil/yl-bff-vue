<template>
  <div>
    <v-row
        align="center"
        justify="center"
    >
      <v-col cols="10">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col
                  cols="12"
                  md="6"
              >
                <span>Scheme</span>
                <v-switch
                    v-model="$vuetify.theme.dark"
                    primary
                    label="Dark"
                ></v-switch>
              </v-col>
              <v-col
                  cols="12"
                  md="6"
              >
                <span>Drawer</span>
                <v-radio-group
                    v-model="drawer.type"
                    column
                >
                  <v-radio
                      v-for="drawer in drawers"
                      :key="drawer"
                      :label="drawer"
                      :value="drawer.toLowerCase()"
                      primary
                  ></v-radio>
                </v-radio-group>
                <v-switch
                    v-model="drawer.clipped"
                    label="Clipped"
                    primary
                ></v-switch>
                <v-switch
                    v-model="drawer.floating"
                    label="Floating"
                    primary
                ></v-switch>
                <v-switch
                    v-model="drawer.mini"
                    label="Mini"
                    primary
                ></v-switch>
              </v-col>
              <v-col
                  cols="12"
                  md="6"
              >
                <span>Footer</span>
                <v-switch
                    v-model="footer.inset"
                    label="Inset"
                    primary
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Cancel</v-btn>
            <v-btn
                text
                color="primary"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SettingView',
  data() {
    return {
      drawers: ['Default (no property)', 'Permanent', 'Temporary']
    }
  },
  methods: {
  },
  computed: {
    ...mapState({
      drawer: state => state.drawer,
      footer: state => state.footer
    })
  }
}
</script>

<style scoped>

</style>
