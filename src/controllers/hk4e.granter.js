const database = require('../database')

const getConfig = (req, res) => {
  res.send({
    retcode: 0,
    message: 'OK',
    data: {
      protocol: true,
      qr_enabled: false,
      log_level: 'INFO',
      announce_url: 'https://sdk.hoyoverse.com/hk4e/announcement/index.html?sdk_presentation_style=fullscreen&announcement_version=1.21&sdk_screen_transparent=true&game_biz=hk4e_global&auth_appid=announcement&game=hk4e#/',
      push_alias_type: 2,
      disable_ysdk_guard: false,
      enable_announce_pic_popup: true,
      app_name: '原神海外',
      qr_enabled_apps: {
        bbs: false,
        cloud: false,
      },
      qr_app_icons: {
        app: '',
        bbs: '',
        cloud: '',
      },
      qr_cloud_display_name: '',
    },
  })
}

const login = (req, res) => {
  let data = JSON.parse(req.body.data)
  database.get('SELECT uid, token FROM accounts WHERE uid = ? AND token = ? LIMIT 1', [data.uid, data.token]).then((result) => {
    if (typeof result !== 'undefined') {
      res.send({
        retcode: 0,
        message: 'OK',
        data: {
          combo_id: 0,
          open_id: result.uid,
          combo_token: result.token,
          data: "{\"guest\":false}",
          heartbeat: false,
          account_type: 1,
          fatigue_remind: null,
        },
      })
    } else {
      res.send({
        retcode: -202,
        message: 'Token invalid!',
      })
    }
  })
}

module.exports = {
  getConfig,
  login,
}
