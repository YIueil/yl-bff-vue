import { mapState } from 'vuex'

export const userMixin = {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
}
