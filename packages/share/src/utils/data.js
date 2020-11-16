export const PRIORITY_MAP = [
  {
    locales: [ 'en' ],
    order: [ 'facebook', 'twitter', 'whatsapp' ],
  },
  {
    locales: [ 'ru' ],
    order: [ 'vk', 'facebook', 'whatsapp' ],
  },
  {
    locales: [ 'zh' ],
    order: [ 'qzone', 'facebook', 'line' ],
  },
  {
    locales: [ 'ja', 'th' ],
    order: [ 'facebook', 'line', 'whatsapp' ],
  },
];

export const SHARE_DATA = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=179569853382104&display=page&href=',
  vk: 'https://vk.com/share.php?url=',
  whatsapp: 'https://wa.me/?text=',
  twitter: 'https://twitter.com/intent/tweet?url=',
  viber: 'viber://forward?text=',
  reddit: 'https://www.reddit.com/submit?url=',
  qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=',
  telegram: 'https://telegram.me/share/url?url=',
  linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  tumblr: 'http://www.tumblr.com/share?v=3&u=',
  line: 'https://social-plugins.line.me/lineit/share?url='
};
