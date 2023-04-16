const database = require('../database')

const loadConfig = (req, res) => {
  res.send({
    retcode: 0,
    message: 'OK',
    data: {
      id: 6,
      game_key: 'hk4e_global',
      client: 'PC',
      identity: 'I_IDENTITY',
      guest: false,
      ignore_versions: '',
      scene: 'S_NORMAL',
      name: '原神海外',
      disable_regist: false,
      enable_email_captcha: false,
      thirdparty: ['fb', 'tw'],
      disable_mmt: false,
      server_guest: false,
      thirdparty_ignore: {},
      enable_ps_bind_account: false,
      thirdparty_login_configs: {
        fb: {
          token_type: 'TK_GAME_TOKEN',
          game_token_expires_in: 2592000,
        },
        tw: {
          token_type: 'TK_GAME_TOKEN',
          game_token_expires_in: 2592000,
        },
      },
      initialize_firebase: false,
    },
  })
}

const login = (req, res) => {
  console.log(req.body)
  database.get('SELECT uid, username, token FROM accounts WHERE username = ? LIMIT 1', req.body.account).then((result) => {
    if (typeof result !== 'undefined') {
      res.send({
        retcode: 0,
        message: 'OK',
        data: {
          account: {
            uid: result.uid,
            name: result.username,
            email: result.username + '@dev.local',
            mobile: '',
            is_email_verify: '0',
            realname: '',
            identity_card: '',
            token: result.token,
            safe_mobile: '',
            facebook_name: '',
            google_name: '',
            twitter_name: '',
            game_center_name: '',
            apple_name: '',
            sony_name: '',
            tap_name: '',
            country: 'VN',
            reactivate_ticket: '',
            area_code: '**',
            device_grant_ticket: '',
            steam_name: '',
            unmasked_email: '',
            unmasked_email_type: 0,
          },
          device_grant_required: false,
          safe_moblie_required: false,
          realperson_required: false,
          reactivate_required: false,
          realname_operation: 'None',
        },
      })
    } else {
      res.send({
        retcode: -202,
        message: 'Incorrect credentials!',
      })
    }
  })
}

const verify = (req, res) => {
  database.get('SELECT uid, username, token FROM accounts WHERE uid = ? AND token = ? LIMIT 1', [req.body.uid, req.body.token]).then((result) => {
    if (typeof result !== 'undefined') {
      res.send({
        retcode: 0,
        message: 'OK',
        data: {
          account: {
            uid: result.uid,
            name: result.username,
            email: result.username + '@dev.local',
            mobile: '',
            is_email_verify: '0',
            realname: '',
            identity_card: '',
            token: result.token,
            safe_mobile: '',
            facebook_name: '',
            google_name: '',
            twitter_name: '',
            game_center_name: '',
            apple_name: '',
            sony_name: '',
            tap_name: '',
            country: 'VN',
            reactivate_ticket: '',
            area_code: '**',
            device_grant_ticket: '',
            steam_name: '',
            unmasked_email: '',
            unmasked_email_type: 0,
          },
          device_grant_required: false,
          safe_moblie_required: false,
          realperson_required: false,
          realname_operation: 'None',
        },
      })
    } else {
      res.send({
        retcode: -202,
        message: 'Verify failed!',
      })
    }
  })
}

module.exports = {
  loadConfig,
  login,
  verify,
}
